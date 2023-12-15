---
tags:
  - encoding
  - webpack
  - spring
  - http
  - gzip
  - brotli
date: 2023-12-15
---
This week, I worked a bit on web content compression. Traditionally, I have always been involved with Java [Spring](https://spring.io/) Backends. So, it was a bit challenging for me to figure out how to implement compression properly, especially in our case where we don't use the - so popular - Spring Boot. It's a simple [Spring MVC](https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/mvc.html) application.
## Background
Browsers are able to indicate their preferences or capabilities for content through a process called [Content negotiation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation#the_accept-encoding_header). Within this negotiation, the browser communicates the types of compression it can handle using the `Accept-Encoding` header. In response, the server can either comply with the request and serve a compressed asset or choose to provide an uncompressed asset. In the former case, it must indicate this choice using the `Content-Encoding` header.
It's also worth to mention that this task is done usually by a Proxy between the client and the server. This was not possible in our case. So let's dive in.
## Frontend
The frontend part is almost too easy to discuss. Our application is bundled via Webpack, which has a cool plugin for this purpose. It implicitly supports `gzip` and `brotli` algorithms.
```js
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
		...
    },
	plugins: [
		new CompressionPlugin({
			filename: '[path][base].gz',
			algorithm: 'gzip',
		}),
		new CompressionPlugin({
			filename: '[path][base].br',
			algorithm: 'brotliCompress',
		}),
	],
});
```
This configuration will generate compressed files alongside the original uncompressed assets. For instance, every JavaScript, Font, CSS, and Image file will have brand new `.gz` and `.br` extensions. Half of the work is done; let's move on to the backend.
## Backend
As I introduced, I'm about to use a Spring MVC backend. Spring exposes every static asset from the `/resources` directory by default. However, the path resolution for the compressed assets must be done through a unique servlet. In this servlet, we have to define the lookup strategy.
```java
@Configuration  
@EnableWebMvc  
@EnableTransactionManagement  
public class DispatcherServletConfiguration implements WebMvcConfigurer {  
  
    @Override  
    public void addResourceHandlers(ResourceHandlerRegistry registry) { 
        // Find all "/js/..." inside the "/js" package... 
        registry.addResourceHandler("/js/**")  
                .addResourceLocations("/js/")  
                .resourceChain(true)  
                // ... serve ".gz" or ".br" if requested  
                .addResolver(new EncodedResourceResolver())  
                // ... otherwise fallback to the original asset
                .addResolver(new PathResourceResolver());  
    }
}
```
The `EncodedResourceResolver` will cleverly look up the asset based on the `Accept-Encoding` header. For example, if `Accept-Encoding: gzip, deflate, br` is set by the browser, then it will serve the `.gz` extension with the `Content-Encoding: gzip` set.
Finally, we have to make sure that the servlet mapping is correct because the resource handlers will be matched relative to the servlet mapping. In the next snippet, we configure it to catch all requests.
```java
public class WebInit implements WebApplicationInitializer {  
  
    @Override  
    public void onStartup(ServletContext container) {
		ServletRegistration.Dynamic dispatcher = container.addServlet("mvc-dispatcher", new DispatcherServlet(dispatcherContext));  
		dispatcher.setLoadOnStartup(1);  
		dispatcher.addMapping("/*");
}
```
## Conclusion
It's a huge game-changer. Our assets are substantial, ranging from 100KiB to even 1MiB. Being able to serve only a fraction of the asset is a lifesaver when considering bandwidth costs. This applies to both the client and the hosted server.
For example, one of our JavaScript chunks weighs 133KiB. With the default compression settings, we can serve a 42KiB `.gz` or a 37KiB `.br`. Pure win! 🥳
## Reference
https://www.baeldung.com/spring-mvc-static-resources