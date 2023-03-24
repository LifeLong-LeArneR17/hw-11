fetch("".concat("https://pixabay.com/api","?key=32926626-9f8218f21c9ddc7b36f942801&q=dog&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=5")).then((function(o){if(!o.ok)throw new Error(o.status);return o.json()})).then((function(o){console.log(o)})).catch((function(o){console.log(o)}));
//# sourceMappingURL=index.412de9f8.js.map
