module.exports = function (grunt) {

	var fs = require('fs');

	grunt.registerMultiTask('beforeUglify', function () {
		var header = this.options().header;

		this.files.forEach(function (mapping) {
			var content = mapping.src.map(function (file) {
				var contents = grunt.file.read(file);

				return contents.replace(/^\/\*![\W\w]*?\*\/\n?/g, '')
								.replace(/^\/\*!(?:.|\n)*?\*\/\n?/gm, function (match) {
										return match.replace(/[^\n]/gm, '');
								});
			}).join('\n');

			grunt.file.write(mapping.dest, (header || '') + content);
		});
	});

	grunt.registerMultiTask('afterUglify', function () {
		this.files.forEach(function (mapping) {
			var mapFilename = mapping.src[0];

			fs.renameSync(mapFilename, mapping.dest);
			
			var buffer = grunt.file.read(mapping.dest)
									.replace(/"dist\//g, '"')
									.replace(/\.pre-min\./g, '.')
									.replace(/\/\/@ sourceMappingURL=cookie\.min\.map$/g, '');
			grunt.file.write(mapFilename, buffer);
		});

		this.options().tempFiles.forEach(function (filename) {
			fs.unlink(filename);
		});
	});

};
