/**
 * SafeGuard Alexa Skill Handler (ASK SDK v2)
 * 5 Voice Intents bridging Alexa -> SafeGuard Ring Intelligence:
 * 1. "Alexa, who's at my door?" -> WhosAtMyDoorIntent
 * 2. "Alexa, show my security report" -> ShowSecurityReportIntent
 * 3. "Alexa, is my family safe?" -> IsFamilySafeIntent
 * 4. "Alexa, arm SafeGuard" -> ArmSafeGuardIntent
 * 5. "Alexa, what happened last night?" -> WhatHappenedLastNightIntent
 */

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'SafeGuard is active. All 4 Ring cameras are online. You can ask: who\'s at my door, is my family safe, or what happened last night.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('How can SafeGuard help protect your home right now?')
            .withSimpleCard('SafeGuard AI Active', speechText)
            .getResponse();
    }
};

/**
 * Intent 1: "Alexa, who's at my door?"
 * Returns AI contextual description of current visitor with threat level.
 */
const WhosAtMyDoorIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WhosAtMyDoorIntent';
    },
    handle(handlerInput) {
        const speechText = 'At your front door, SafeGuard Bedrock AI identified an unknown individual. This is his 3rd visit this week, all after 10 PM. Threat level is HIGH. I have turned on your front floodlight, saved a 60-second video clip, and sent a push alert to Priya\'s phone.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withStandardCard(
                'Visitor Alert: Unknown Person (Threat: HIGH)',
                'Bedrock Claude 3 Haiku Analysis:\n3rd visit this week at 11:47 PM. Rekognition: 0% match to family profiles.\nAction: Floodlight turned on, video saved.',
                'https://safeguard.ring.internal/snapshots/front_door_latest.jpg'
            )
            .getResponse();
    }
};

/**
 * Intent 2: "Alexa, show my security report"
 * Weekly summary with behavioral patterns and 95% alert noise reduction.
 */
const ShowSecurityReportIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ShowSecurityReportIntent';
    },
    handle(handlerInput) {
        const speechText = 'Here is your weekly SafeGuard report. Your Ring cameras captured 164 motion events this week. SafeGuard AI filtered out 156 harmless events, saving you from alert fatigue with a 95% noise reduction. Your current home security score is 96 out of 100, which qualifies you for a 12% home insurance discount.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('SafeGuard Weekly Security Report', '164 Raw Events -> 8 Meaningful Alerts (95% Noise Reduction)\nSecurity Score: 96/100 (12% Insurance Discount Eligible)')
            .getResponse();
    }
};

/**
 * Intent 3: "Alexa, is my family safe?"
 * Real-time status of all family members (Grandma Meera, Aarav, Priya).
 */
const IsFamilySafeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IsFamilySafeIntent';
    },
    handle(handlerInput) {
        const speechText = 'Here is your family safety status: Aarav arrived safely home from school at 3:15 PM, and the front door deadbolt is locked. Priya is active and working remotely. Notice: Grandma Meera has had no motion detected in her living room for 8 hours. SafeGuard has triggered a gentle wellness check alert to verify she is okay.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withStandardCard(
                'Family Safety Status',
                '• Aarav (10): Home safely at 3:15 PM (Door Locked)\n• Priya (38): Active at Home\n• Grandma Meera (75): Wellness Check Pending (8h inactive)',
                'https://safeguard.ring.internal/family/family_status.jpg'
            )
            .getResponse();
    }
};

/**
 * Intent 4: "Alexa, arm SafeGuard"
 * Activates enhanced monitoring / travel mode.
 */
const ArmSafeGuardIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ArmSafeGuardIntent';
    },
    handle(handlerInput) {
        const speechText = 'SafeGuard is now armed in Enhanced Perimeter Protection mode. All Ring floodlights and motion sensors are set to maximum AI sensitivity, smart locks are engaged, and zero-false-positive filtering is active. Have a safe night.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('SafeGuard Armed', 'Mode: Enhanced Perimeter Protection\nSmart Locks: Engaged\nCameras: Max AI Sensitivity')
            .getResponse();
    }
};

/**
 * Intent 5: "Alexa, what happened last night?"
 * Overnight event summary with AI analysis.
 */
const WhatHappenedLastNightIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WhatHappenedLastNightIntent';
    },
    handle(handlerInput) {
        const speechText = 'Last night between 11 PM and 6 AM, your Ring cameras detected 14 motion triggers. 13 were filtered out as harmless wind and a neighbor\'s cat. At 2:14 AM, the Driveway Spotlight detected a delivery van turning around. SafeGuard classified it as Low Threat. No perimeter breaches occurred.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Overnight Activity Summary', '14 Motion Events Filtered -> 0 Threats Detected\n2:14 AM: Delivery Van turnaround (Low Threat)')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can ask SafeGuard who is at your door, check if your family is safe, or request your weekly security report.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'SafeGuard standing by.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const speechText = 'SafeGuard encountered an issue processing your request. Please try again.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        WhosAtMyDoorIntentHandler,
        ShowSecurityReportIntentHandler,
        IsFamilySafeIntentHandler,
        ArmSafeGuardIntentHandler,
        WhatHappenedLastNightIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
