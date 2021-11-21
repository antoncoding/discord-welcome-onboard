const DISCORD_BASE_CDN = "https://cdn.discordapp.com/";
const request = require("request");
const fs = require("fs");
const images = require("images");

// const fetch = require("node-fetch");
exports.run = (client, message) => {
  
  const avatar_hash = message.author.avatar;
  const url = `${DISCORD_BASE_CDN}avatars/${message.author.id}/${avatar_hash}.png?size=512`;

  const baseImage = "./imgs/base.png";

  // files in data/ will be ignored on github
  const pfpImg =  "./data/pfp.png";
  const clearedImg = "./data/removed.png";
  const finalImg = "./data/finalImg.png";
  
  download(url, pfpImg, function() {
    removeBackGround(pfpImg, clearedImg, () => {
      mergeImages(baseImage, clearedImg, finalImg);
      message.channel.send({ 
        content: "Welcome to the Squeeth nation! Claim your citizen role by changing your profile pic!", 
        files: [finalImg] 
      });
    });
  }
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: "User"
};

exports.help = {
  name: "join",
  category: "System",
  description: "Join the squeeth nation!",
  usage: "help [command]"
};


function mergeImages(base, img2, output) {
  images(base).size(500).draw(images(img2).size(512), 10, 10).save(output);
}

const download = function(uri, filename, callback) {
  request.head(uri, function() {
    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", callback);
  });
};

function removeBackGround(input, output, callback) {
  // console.log("!(process.env.CM_IS_PRODUCTION === \"true\")", new Boolean(!(process.env.CM_IS_PRODUCTION === "true"))).toString();
  return request.post({
    url: "https://clippingmagic.com/api/v1/images",
    formData: {
      image: fs.createReadStream(input), // TODO: Replace with your image
      format: "result",
      test: process.env.CM_IS_TEST,
    },
    auth: {
      user: process.env.CM_USER, 
      pass: process.env.CM_PASS
    },
    followAllRedirects: true,
    encoding: null
  }, function(error, response, body) {
    if (error) {
      console.error("Request failed:", error);
    } else if (!response || response.statusCode != 200) {
      console.error("Error:", response && response.statusCode, body.toString("utf8"));
    } else {
      fs.writeFileSync(output, body);
      callback();
    }
  });
}
