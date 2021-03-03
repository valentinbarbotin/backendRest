module.exports = (req, res, next) => {
    try {
      var ip = req.connection.remoteAddress;
      // console.log("ip");
      // console.log(ip);
      ip = ip.split(':')[3];

      var liste = ['::1','172.22.0.1','85.190.75.217'];

        if (liste.includes(ip)) {
            next();
        } else {
            next();
            // res.status(403).send(`<script>alert("${ip} non autorisée. L'intranet est en cours de construction")</script>`);
        };
      } catch {
        // console.log(err)
      };
};