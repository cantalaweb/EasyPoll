const getIP = async (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.send({ ip: clientIp });
}

module.exports = { getIP };
