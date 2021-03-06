const Discord = require("discord.js");

const config = require("./config.json");
const prefix = config.prefix;
const token = config.token;
const log_channel = config.log_channel;
const team_max = config.team_max

const userdata = require("./userdata.json");
const fs = require("fs");

const bot = new Discord.Client();

function generateHex() {
	return "#" + Math.floor(Math.random()*16777215).toString(16);
};

function saveJSON(filePath, fileData) {
	fs.writeFile(filePath, JSON.stringify(fileData, null, 2), (err) => {
		if (err) console.error(err);
	});
};

function joinTeam(message, team, created) {
	message.member.addRole(team);
	var userdata = JSON.parse(fs.readFileSync("./userdata.json", "utf8"));
	userdata[message.author.id].team = team.id;
	saveJSON("./userdata.json", userdata);
	if (created === "true") {
		message.channel.send("<@" + message.author.id + "> created team <@&" + team.id + ">. Members: " + [team.members.size + 1] + "/" + team_max);
		log(message.author, "Ran Command \"team join\"", null, message.channel, ["Tag", "<@&" + team.id + ">"], ["Name", team.name], ["ID", team.id], ["Members", [team.members.size + 1] + "/" + team_max], ["Created", "True"]);
	};
	if (created === "false") {
		message.channel.send("<@" + message.author.id + "> joined team <@&" + team.id + ">. Members: " + [team.members.size + 1] + "/" + team_max);
		log(message.author, "Ran Command \"team join\"", null, message.channel, ["Tag", "<@&" + team.id + ">"], ["Name", team.name], ["ID", team.id], ["Members", [team.members.size + 1] + "/" + team_max], ["Created", "False"]);
	};
};

function test(test, test1) {
	console.log(test.type + " " + test1.name);
};

function log(author, title, description, channel, field1, field2, field3, field4, field5, field6, field7, field8, field9) {
	var date = new Date();
	var minutes = date.getMinutes().toString().length == 1 ? '0'+ date.getMinutes() : date.getMinutes();
	var hours = date.getHours().toString().length == 1 ? '0'+ date.getMinutes() : date.getMinutes();
	var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	var timeString = date.toLocaleTimeString("en-GB", {hour12: false});
	var dateString = days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()];

	var logMessage = "[" + dateString + " " + timeString + "] " + author.tag + " > " + title.toLowerCase();
	var embed = new Discord.RichEmbed()
		.setColor(0xFFFF00)
		.setFooter(author.username + " on " + dateString + " at " + timeString, author.avatarURL)
		.setTitle(title)
	if (channel) {
		embed.setFooter(author.username + " in #" + channel.name + " on " + dateString + " at " + timeString, author.avatarURL);
		logMessage += " in #" + channel.name;
	};
	if (description) {
		embed.setDescription(description);
		logMessage += " (" + description.toLowerCase() + ")";
	};
	if (field1) {
		embed.addField(field1[0], field1[1], true);
		logMessage += " (" + field1[0].toLowerCase() + ": \"" + field1[1].toLowerCase() + "\")";
	};
	if (field2) {
		embed.addField(field2[0], field2[1], true);
		logMessage += " (" + field2[0].toLowerCase() + ": \"" + field2[1].toLowerCase() + "\")";
	};
	if (field3) {
		embed.addField(field3[0], field3[1], true);
		logMessage += " (" + field3[0].toLowerCase() + ": \"" + field3[1].toLowerCase() + "\")";
	};
	if (field4) {
		embed.addField(field4[0], field4[1], true);
		logMessage += " (" + field4[0].toLowerCase() + ": \"" + field4[1].toLowerCase() + "\")";
	};
	if (field5) {
		embed.addField(field5[0], field5[1], true);
		if (!field6) {
			embed.addBlankField(true);
		};
		logMessage += " (" + field5[0].toLowerCase() + ": \"" + field5[1].toLowerCase() + "\")";
	};
	if (field6) {
		embed.addField(field6[0], field6[1], true);
		logMessage += " (" + field6[0].toLowerCase() + ": \"" + field6[1].toLowerCase() + "\")";
	};
	if (field7) {
		embed.addField(field7[0], field7[1], true);
		logMessage += " (" + field7[0].toLowerCase() + ": \"" + field7[1].toLowerCase() + "\")";
	};
	if (field8) {
		embed.addField(field8[0], field8[1], true);
		if (!field9) {
			embed.addBlankField(true);
		};
		logMessage += " (" + field8[0].toLowerCase() + ": \"" + field8[1].toLowerCase() + "\")";
	};
	if (field9) {
		embed.addField(field9[0], field9[1], true);
		logMessage += " (" + field9[0].toLowerCase() + ": \"" + field9[1].toLowerCase() + "\")";
	};
	bot.channels.get(log_channel).send({embed});
	console.log(logMessage);
};

var fortunes = [
	"yes",
	"no",
	"maybe",
	"fuck off"
];

bot.on("ready", function() {
	log(bot.user, "Logged In");
});

bot.on("message", function(message) {
	// message from bot
	if (message.author.equals(bot.user)) return;

	// message without prefix
	if (!message.content.startsWith(prefix)) return;

  // set variable to all args
	var args = message.content.substring(prefix.length).split(" ");

	// get lowercase of first arg
	switch (args[0].toLowerCase()) {
		// command ping
		case "ping":
			log(message.author, "Ran Command \"ping\"", null, message.channel)
			message.channel.send("pong");
			break;

		// command delete
		case "delete":
			// only my ID
			if (message.author.id === "180975824273408000") {
				let messageCount = parseInt(args[1]);
				if (messageCount >= 2 && messageCount < 100) {
					message.channel.fetchMessages({limit: messageCount}).then(messages => message.channel.bulkDelete(messages));
					log(message.author, "Ran Command \"delete\"", null, message.channel, ["Messages Deleted", args[1]]);
					break;
				}
				else {
					message.channel.send("[2,100>");
					log(message.author, "Ran Command \"delete\"", null, message.channel, ["Error", "Not A Valid Number"])
					break;
				}
				break;
			}
			// no permissions
			else {
				message.channel.send("NO PERMISSIONS")
				log(message.author, "Ran Command \"delete\"", null, message.channel, ["Error", "No Permissions"])
			}
			break;

		// command info
		case "info":
			log(message.author, "Ran Command \"info\"", null, message.channel)
			message.channel.send("Hello, this is info");
			break;

		// command 8ball
		case "8ball":
			// get random string from list
			if (args[1]) {
				var answer = fortunes[Math.floor(Math.random()) * fortunes.length];
				message.channel.send(answer);
				log(message.author, "Ran Command \"8ball\"", null, message.channel, ["Question", message.content.substring(7)], ["Answer", answer]);
			}
			// no first word
			else {
				message.channel.send("Can't read that");
				log(message.author, "Ran Command \"8ball\"", null, message.channel, ["Error", "No Question Specified"]);
			};
			break;

		// command setgame
		case "setgame":
			// set variable to game
			var game = message.content.substring(9);
			if (game) {
				// set game
				bot.user.setPresence({
					game: {
						name: game,
						type: 0
					}
				});
				message.channel.send("I'm now playing: `" + game + "`");
				log(message.author, "Ran Command \"setgame\"", null, message.channel, ["Game", game]);
				break;
			}
			else {
				// clear game
				bot.user.setPresence({
					game: null
				});
				message.channel.send("Cleared game");
		 		log(message.author, "Ran Command \"setgame\"", "Cleared Game", message.channel);
				break;
			};
			break;

		// command test
		case "test":
		var embed = new Discord.RichEmbed()
			.setAuthor(bot.users.find("id", "309692735231623172").username, bot.users.find("id", "309692735231623172").avatarURL, bot.users.find("id", "309692735231623172").avatarURL)
			.setColor(0x00E5FF)
			.setDescription("De stemmen zijn geteld. **15:00** had de meeste stemmen, daarom verzamelen we met z'n allen **om 15:00 op zatedag 16 september in het spraakkanaal \"general\"**. Eerst wordt alles uitgelegd en daarna kunnen we de server joinen. Als je niet kan of als je twijfelt, stuur dan een bericht naar @Alex om te overleggen voor een andere datum.")
			.setFooter("Alex, Jenna & Shane", bot.users.find("id", "309692735231623172").avatarURL)
			.setTitle("Lancering Seizoen III")
		message.channel.send("||__**Lancering Seizoen III**__|| @everyone");
		message.channel.send({embed});
		console.log(bot.users.find("id", "309692735231623172"));
		break;

		case "team":
		if (args[1]) {
			switch (args[1].toLowerCase()) {
				case "join":
				// team is not specified
				if (typeof args[2] === "undefined") {
					message.channel.send("SPECIFY TEAM");
					log(message.author, "Ran Command \"team join\"", null, message.channel, ["Error", "No Team Specified"]);
					break;
				}
				else {
					var teamName = message.content.substring(args[0].length + args[1].length + 3).split(" ").join(" ").toLowerCase();
					// team name too short
					if (teamName.length < 2) {
						message.channel.send(teamName.length + " < 2");
						log(message.author, "Ran Command \"team join\"", null, message.channel, ["Error", "Team Name Is Too Short"], ["Length", teamName.length + " (<2)"]);
					}
					// team name too long
					else if (teamName.length > 16) {
						message.channel.send(teamName.length + " > 16");
						log(message.author, "Ran Command \"team join\"", null, message.channel, ["Error", "Team Name Is Too Long"], ["Length", teamName.length + " (>16)"]);
					}
					// team name is correct
					else {
						// team doesn't exist yet
						if (message.member.guild.roles.find("name", teamName) === null) {
							message.member.guild.createRole({
								color: generateHex(),
								hoist: true,
								mentionable: true,
								name: teamName,
								permissions: []
							}).then(function() {
								joinTeam(message, message.member.guild.roles.find("name", teamName), "true");
								message.member.guild.createChannel(teamName.split(" ").join("_"), "text" , [{
									id: message.member.guild.roles.find("name", teamName).id,
									allow: 515136,
									type: "role"
								}])
								message.member.guild.createChannel(teamName.split(" ").join("_"), "voice", [{
									id: message.member.guild.roles.find("name", teamName).id,
									allow: 36700160,
									type: "role"
								}]);
							});
						}
						// team does exist and isn't full
						else if (message.member.guild.roles.find("name", teamName) !== null && message.member.guild.roles.find("name", teamName).members.size < team_max) {
							joinTeam(message, message.member.guild.roles.find("name", teamName), "false");
						}
						else {
							message.channel.send("TEAM IS FULL");
							log(message.author, "Ran Command \"team join\"", null, message.channel, ["Error", "Team Is Full"]);
							break;
						};
						break;
					};
					break;
				};

				case "leave":
				var userdata = JSON.parse(fs.readFileSync("./userdata.json", "utf8"));
				// last member is leaving
				if (userdata[message.author.id].team > 0) {
					var team = message.member.guild.roles.find("id", userdata[message.author.id].team);
					// last member is leaving
					if (team.members.size === 1) {
						log(message.author, "Ran Command \"team leave\"", null, message.channel, ["Tag", "<@&" + team.id + ">"], ["Name", team.name], ["ID", team.id], ["Members", [team.members.size - 1].toString() + "/" + team_max], ["Deleted", "True"]);
						message.channel.send("<@&" + team.id + "> has been deleted because <@" + message.author.id + "> was the last person to leave").then(function(deleteChannelOne) {
							message.member.guild.channels.filter(test, team);
							//message.member.guild.channels.find("name", team.name.split(" ").join("_")).delete();
						}).then(function(deleteChannelTwo) {
							console.log("end");
							//console.log(message.member.guild.channels.find("name", team.name.split(" ").join("_")));
							//message.member.guild.channels.find("name", team.name.split(" ").join("_")).delete();
						}).then(function(deleteTeam) {
								team.delete();
						}).then(function(resetTeam) {
							delete userdata[message.author.id].team;
						}).then(function(saveData) {
							saveJSON("./userdata.json", userdata);
						});
						break;
					}
					// last member is not leaving
					else {
						message.member.removeRole(team);
						message.channel.send("<@" + message.author.id + "> left team <@&" + team.id + ">");
						log(message.author, "Ran Command \"team leave\"", null, message.channel, ["Tag", "<@&" + team.id + ">"], ["Name", team.name], ["ID", team.id], ["Members", [team.members.size - 1].toString() + "/" + team_max], ["Deleted", "False"]);
						delete userdata[message.author.id].team;
						saveJSON("./userdata.json", userdata);
						break;
					};
				}
				else {
					message.channel.send("YOU'RE NOT IN A TEAM");
					log(message.author, "Ran Command \"team leave\"", null, message.channel, ["Error", "No Team To Leave"])
				};
				break;

				default:
				message.channel.send("USE LIKE THIS");
				log(message.author, "Ran Command\"team leave\"", null, message.channel, ["Error", "Invalid Subcommand"]);
				break;
			};
		}
		else {
			message.channel.send("USE LIKE THIS");
			log(message.author, "Ran Command\"team leave\"", null, message.channel, ["Error", "Invalid Subcommand"]);
			break;
		};
		break;

		// invalid command
		default:
			message.channel.send("INVALID COMMAND");
			if (args.join().length > 0) {
				log(message.author, "Invalid Command", null, message.channel, ["Command", args.join(" ")]);
			}
			else {
			log(message.author, "Invalid Command", "No Command", message.channel)
			}
		}
});

bot.login(token);
