---
id: Parallel ent-to-end testing
aliases:
  - Between tests
tags:
  - e2e
  - test
  - playwright
  - generator
date: 2024-01-19
---
End-to-end testing is a method to test the application fully from a user perspective in an automated way. This means that there is no separated module or mock during the test execution. The tests are running against a real application and database. Recently, [Playwright](https://playwright.dev/) has emerged as the de-facto end-to-end testing library. In my opinion, this is thanks to its ability to simulate the most popular browsers in parallel. Let's dive into that.

I don't want to bother anyone with the boring details of how to use Playwright. Let's say that if you've ever worked with [Jest](https://jestjs.io/), you're already familiar with the syntax. This post will be about using test data in parallel within tests.

## Between tests

In my use case, I needed unique IDs with each test execution. It wouldn't take so long for an average Joe to add a `while` or `for` loop to simply use incremented numbers as IDs. But I have better advice for you. [JavaScript generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) fit best for this task. Let's see an example.

```js
*generator(index: number) {
    while (index < Number.MAX_SAFE_INTEGER) {
        yield index++;
    }
    return -1;
}

const it = this.generator(info, 1);
it.next().value; // 1
it.next().value; // 2
it.next().value; // 3
```

## Between workers

Playwright uses [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) to run tests in parallel. Each worker has a separate context and browser. This means that they cannot communicate with each other, which is a huge deal when you want to ensure that tests are using unique IDs. Luckily, Playwright can assign unique IDs to workers (`workerIndex`, `parallelIndex`) and inject them into tests. This helps us further ensure unique IDs.

```js
*generator(testInfo: TestInfo, index: number) {
    const { workerIndex } = testInfo;
    while (index < Number.MAX_SAFE_INTEGER) {
        yield `${workerIndex + 1}.${index++}`;
    }
    return '';
}

const it = this.generator(info, 1);
it.next().value; // 1.1
it.next().value; // 1.2
it.next().value; // 1.3
```

## Between projects

[Projects](https://playwright.dev/docs/test-projects) group multiple tests. Within a project, tests use the same configuration and browser by default. But what if you are running parallel browser end-to-end tests against a single database instance? Well, you will end up with the same ID sequence for each project, and they will conflict. We can leverage the configuration to our advantage. Let's [parameterize](https://playwright.dev/docs/test-parameterize#parameterized-projects) each config and inject them into the generator.

```js
// playwright.config.js
export default defineConfig({
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'], projectId: '1' },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'], projectId: '2' },
        },
    ],
});

// fixture.ts
export const test = base.extend<TestOptions>({
  // Our generator fixture
  idGenerator: [
	async ({ projectId }, use) => {
		await use(new IdGenerator(projectId, test.info().workerIndex));
	},
	{ scope: 'worker' },
],
});

// id-generator.ts
class IdGenerator {
    readonly it;
    readonly projectId;
    readonly workerId;
    current: string;

    constructor(projectId: string, workerId: number) {
        this.it = this.generator(1);
        this.projectId = projectId;
        this.workerId = workerId;
        this.current = '';
    }

    *generator(index: number) {
        while (index < Number.MAX_SAFE_INTEGER) {
            yield `${this.projectId}.${this.workerIndex + 1}.${index++}`;
        }
        return '';
    }

    next() {
        this.current = this.it.next().value;
        return this.current;
    }
}
```

## Conclusion

Obviously, the generated ID is not the most secure and fault-tolerant. It's the reader's responsibility to align the algorithm accordingly. I hope you got the idea. Until next time.

## References

- https://playwright.dev/docs/intro
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator

