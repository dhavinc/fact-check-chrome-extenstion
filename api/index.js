const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require("child_process");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.get('/', (req, res) => {
  console.log('in server');
  res.send('helo helo');
});
app.post('/', (req, res) => {
  console.log(req.body.term);
  if (req.body.term) {
		exec(`python ./python/main.py "${req.body.term}"`, (error, stdout, stderr) => {
			if (error) {
					console.log(`error: ${error.message}`);
					return res.status(401).json({ error });
			}
			if (stderr) {
					console.log(`stderr: ${stderr}`);
					return res.status(401).json({ stderr });
			}
			console.log(`stdout: ${stdout}`);

			return res.status(200).json(JSON.parse(stdout));
	});
  } else {
		return res.status(401).json({ error: 'No terms' });
	}
});
app.listen(4200, () => {
  console.log('server is running');
});
