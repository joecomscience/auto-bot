const livediness = (req, res) => res.sendStatus(200);
const readiness = (req, res) => {
  const ready = global.ready;
  if (ready) {
    res.sendStatus(200);
    return;
  }

  res.sendStatus(503);
}

module.exports = {
  livediness
};
