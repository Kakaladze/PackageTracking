module.exports.response200 = (res, message) => res.status(200).json({ success: true, message });

// eslint-disable-next-line max-len
module.exports.response400 = (res, message, error = null) => res.status(400).json({ success: false, message, error });
