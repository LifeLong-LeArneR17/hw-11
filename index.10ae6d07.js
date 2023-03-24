fetch("https://pixabay.com/api?key=32926626-9f8218f21c9ddc7b36f942801&q=dog&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=5").then((o=>{if(!o.ok)throw new Error(o.status);return o.json()})).then((o=>{console.log(o)})).catch((o=>{console.log(o)}));
//# sourceMappingURL=index.10ae6d07.js.map
