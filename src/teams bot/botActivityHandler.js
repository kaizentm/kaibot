// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const {
    TurnContext,
    MessageFactory,
    TeamsActivityHandler,
    CardFactory,
    ActionTypes
} = require('botbuilder');

const delay = require('delay');

class BotActivityHandler extends TeamsActivityHandler {
    constructor() {
        super();
        /* Conversation Bot */
        /*  Teams bots are Microsoft Bot Framework bots.
            If a bot receives a message activity, the turn handler sees that incoming activity
            and sends it to the onMessage activity handler.
            Learn more: https://aka.ms/teams-bot-basics.

            NOTE:   Ensure the bot endpoint that services incoming conversational bot queries is
                    registered with Bot Framework.
                    Learn more: https://aka.ms/teams-register-bot. 
        */
        // Registers an activity event handler for the message event, emitted for every incoming message activity.
        this.onMessage(async (context, next) => {
            TurnContext.removeRecipientMention(context.activity);
            switch (context.activity.text.trim()) {
            case 'Hello':
                await this.mentionActivityAsync(context, 'Hi');
                break;
            case 'Goodbye':
                await this.mentionActivityAsync(context, 'Goodbye');
                break;
            case 'Run Unit Tests':
                const replyActivity1 = MessageFactory.text(`Running unit tests ...`);
                await context.sendActivity(replyActivity1);
                await delay(1000);
                const replyActivity2 = MessageFactory.text(`Unit tests completed.`);
                await context.sendActivity(replyActivity2);
                break;
            case 'Build Artifacts':
                const replyActivity3 = MessageFactory.text(`Building artifacts ...`);
                await context.sendActivity(replyActivity3);
                const replyActivity4 = MessageFactory.text(`Artifacts are built.`);
                await context.sendActivity(replyActivity4);
                break;
            default:
                // By default for unknown activity sent by user show
                // a card with the available actions.
                const value = { count: 0 };
                const card = CardFactory.heroCard( 
                    'Here is what I can do:',
                    null,
                    [{
                        type: ActionTypes.MessageBack,
                        title: 'Say Hello',
                        value: value,
                        text: 'Hello'
                    },{
                        type: ActionTypes.MessageBack,
                        title: 'Say Goodbye',
                        value: value,
                        text: 'Goodbye'
                    },{
                        type: ActionTypes.MessageBack,
                        title: 'Run Unit Tests',
                        value: value,
                        text: 'Run Unit Tests'
                    },{
                        type: ActionTypes.MessageBack,
                        title: 'Build Artifacts',
                        value: value,
                        text: 'Build Artifacts'
                    }
                ]);
                await context.sendActivity({ attachments: [card] });
                break;
            }
            await next();
        });
        /* Conversation Bot */
    }

    /* Conversation Bot */
    /**
     * Say hello and @ mention the current user.
     */
    async mentionActivityAsync(context, msg) {
        const TextEncoder = require('html-entities').XmlEntities;

        const mention = {
            mentioned: context.activity.from,
            text: `<at>${ new TextEncoder().encode(context.activity.from.name) }</at>`,
            type: 'mention'
        };

        const replyActivity = MessageFactory.text(msg + ` ${ mention.text }`);
        replyActivity.entities = [mention];
        
        await context.sendActivity(replyActivity);
    }
    /* Conversation Bot */

}

module.exports.BotActivityHandler = BotActivityHandler;

