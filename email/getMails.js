process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const fs = require('fs');
const {promisify} = require('util')
const writeFileAsync = promisify(fs.writeFile)

const randomstring = require("randomstring");

const imaps = require('imap-simple');
const simpleParser = require('mailparser').simpleParser;
const _ = require('lodash');

const pool = require('./db_config');

const config = {
    imap: {
        user: "itsupport@cargen.com",
        password: "Support2019",
        host: "mail.cargen.com",
        port: 993,
        tls: true,
        authTimeout: 3000
    }
};
 
function generateTicket() {
    let ticket = randomstring.generate(8).toString();
    ticket = `${ticket.substring(0, 4)}-${ticket.substring(4)}`;
    return ticket.toUpperCase();
}

async function getMails() {
    let connection = null;
    try {
        connection = await imaps.connect(config);
        const box = await connection.openBox('INBOX', true);

        // console.log("--------------------------1")

        const searchCriteria = ['UNSEEN'];
        const fetchOptions = {
            bodies: ['HEADER', 'TEXT', ''],
            struct: true,
            markSeen: true
        };

        let messages = null;
        try {
            // console.log("--------------------------1.1")
            messages = await connection.search(searchCriteria, fetchOptions);
            // console.log("--------------------------1.2")
        }catch(err) {
            console.log(err);
        }


        // console.log("--------------------------2")

        messages.forEach(async (message) => {

            // console.log("--------------------------3")

            await connection.addFlags(message.attributes.uid, "Seen");

            //get header and body
            const all = _.find(message.parts, {"which": ""})
            const id = message.attributes.uid;
            let idHeader = "Imap-Id: " + id + "\r\n";

            try {
                let mail = await simpleParser(idHeader + all.body);
                await writeFileAsync(`mails/${id}.html`, mail.html || mail.text);
                console.log(`${id}.html saved`);

                let issue = null;
                let addIssue = null;
                let issueAttachments = [];
                try {
                    issue = {
                        email_message_id: mail.messageId,
                        email_id: mail.messageId,
                        email_subject: mail.subject,
                        email_from: mail.from && mail.from.value && mail.from.value[0].address,
                        email_body: `${id}.html`,
                        email_date: mail.date,
                        ticket: generateTicket(),
                    };
                    addIssue = await pool.query(`INSERT INTO issues SET ?`, issue);
                } catch (e) {
                    console.log(e);
                }

                for (let attach of mail.attachments) {
                    await writeFileAsync(`files/${id}-${attach.filename}`, attach.content);
                    issueAttachments.push([
                        addIssue.insertId,
                        `${id}-${attach.filename}`
                    ]);
                }

                if (Array.isArray(mail.attachments) && mail.attachments.length > 0) {
                    try {
                        await pool.query(`INSERT INTO issue_attachments (issue_id, attachment) VALUES ?`, [issueAttachments]);
                    } catch (e) {
                        console.log(e);
                    }
                }

                console.log(issue);
                console.log(issueAttachments);
            } catch (err) {
                console.log(err);
            }

        });

        await connection.imap.closeBox(false, (err) => { //Pass in false to avoid delete-flagged messages being removed
            if (err) {
                console.log(err);
            }
        });
        await connection.end();
        await console.log("Done fetching emails.........");
    } catch (e) {
        console.log(e);
    }
}

module.exports = () => getMails();
