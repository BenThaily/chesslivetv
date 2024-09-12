import { Meteor } from 'meteor/meteor';
import { Messages } from '/imports/api/messages';
import { WebApp } from "meteor/webapp";


Messages.allow({
  insertAsync(userId, doc) {
    // Allow insert only if the user is logged in (userId exists)
    return !!userId;
  },
});
Meteor.publish('messages', function (roomId) {
  return Messages.find({ roomId }, { sort: { createdAt: -1 }, limit: 50 });
});

Meteor.startup(async () => {

  Messages.removeAsync({})

  WebApp.rawHandlers.use(function(req, res, next) {
    // add headers
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log(req.url)
    if (req.method === 'GET' && req.url.endsWith('.wasm')) {
      res.setHeader('Content-Type', 'application/wasm');
    }
    // don't forget the next call!
    next();
  });
});

