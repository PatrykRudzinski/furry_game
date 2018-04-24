module.exports = {
    entry: './js/app.js',
    output: {
        path: `${__dirname}/dist/js`,
        filename: 'bundle.js'
    },
    watch: true,
    mode: "development", //ta opcja zostanie pominięta jeżeli użyjemy npm run build
    devtool: "source-map"
}
