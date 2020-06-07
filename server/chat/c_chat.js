const controller = {};

controller.participants = (req, res) => {
    res.send(global.participants);
}


module.exports = controller;