

module.exports = async (ctx) => {

        ctx.body = {
            filename: ctx.req.file.filename//返回文件名
        }

};
