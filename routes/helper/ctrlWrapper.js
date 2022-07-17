// тут не совсем понятна идея обертки ведь вместо трай кетч в контроллере вынуженно создавать ифы и проверять что либо перед тем как выкинуть ошибку а ифы работают уж точно не бЫстрее чем трай кетч

const ctrlWrapper = (ctl) => {
    const func = async (req, res, next) => {
        try {
            await ctl(req, res, next);
        } catch (error) {
            next(error);
        }
    };
    return func;
};

module.exports = ctrlWrapper;
