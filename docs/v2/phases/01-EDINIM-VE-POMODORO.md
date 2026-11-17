<!-- Kaynak: proje sahibinin "CRITICAL PRODUCT REQUIREMENT — STRUCTURED LANGUAGE ACQUISITION + POMODORO" metni. Kişisel satırlar çıkarıldı ([…] ile işaretli); geri kalanı birebir. -->

# CRITICAL PRODUCT REQUIREMENT — STRUCTURED LANGUAGE ACQUISITION + POMODORO

This instruction is a core part of Deutsch Werkstatt 2.0. It must be incorporated into the product architecture, curriculum, user experience, database, and development roadmap.

## PART 1 — DO NOT THROW THE LEARNER INTO CONVERSATION WITHOUT PREPARATION

My goal is to speak German, but I cannot speak with vocabulary, expressions, or sentence structures I have not learned.

Therefore, do not build an application that relies mainly on live AI conversations or imitation.

Create a structured six-stage learning method:

1. VOCABULARY ACQUISITION
   Teach useful words with Turkish meanings, articles, pronunciation, examples, and context.

2. CHUNK AND EXPRESSION ACQUISITION
   Teach words in natural combinations, collocations, verb patterns, and everyday expressions.

3. SENTENCE BUILDING
   Teach how to construct useful sentences using the newly learned vocabulary and expressions.

4. CONTROLLED PRACTICE
   Use fill-in-the-blank exercises, sentence ordering, translation in both directions, guided responses, and sentence transformations.

5. GUIDED REAL-LIFE DIALOGUES
   Let the learner practice conversations with hints, sentence starters, suggested vocabulary, and gradually reduced support.

6. INDEPENDENT SPEAKING
   Finally, let the learner complete realistic conversations without prepared answers.

The system must move between these stages according to actual learner performance, not just a fixed lesson schedule.

## PART 2 — TEACH VOCABULARY DEEPLY

Do not teach isolated translations.

For important words provide:

- Turkish meaning.
- Article and plural for nouns.
- Verb forms and common constructions for verbs.
- Pronunciation and audio where available.
- Common collocations.
- Useful sentence patterns.
- Natural example sentences.
- Formal and informal usage.
- Related expressions.
- Common learner mistakes.

For example, when teaching "verschieben", also teach:

- einen Termin verschieben
- einen Arzttermin verschieben
- etwas auf nächste Woche verschieben
- Könnten wir den Termin verschieben?

Teach words that belong together and can be used in the same real-life situation.

## PART 3 — PERSONAL VOCABULARY GAP DETECTION

During every exercise and conversation:

- Detect words the learner does not know.
- Detect expressions the learner understands but cannot actively use.
- Detect sentence structures the learner struggles to produce.
- Save unknown and weak vocabulary in a personal vocabulary bank.
- Reintroduce these items through spaced repetition.
- Track passive recognition separately from active production.
- Allow the learner to request an immediate Turkish explanation.
- Return to the conversation after the explanation.

Never punish the learner for asking what a word means.

## PART 4 — ADAPTIVE CONVERSATION PREPARATION

Before starting a real-life scenario:

1. Identify the vocabulary needed for the scenario.
2. Check which words and expressions the learner already knows.
3. Teach missing essential vocabulary.
4. Practice useful sentence patterns.
5. Practice likely responses from the other person.
6. Start a guided dialogue.
7. Gradually remove hints.
8. Finish with an independent role-play.

Do not require the learner to memorize a huge vocabulary list before starting a scenario.

Teach manageable groups of high-utility expressions.

## PART 5 — GRAMMAR THROUGH COMMUNICATION

Grammar must support sentence construction.

Teach grammar when it helps the learner express something.

For example:

- Word order in main clauses.
- Questions.
- Modal verbs.
- Accusative and dative in practical contexts.
- Separable verbs.
- Perfect tense for everyday past events.
- Subordinate clauses.
- Konjunktiv II for polite requests.

Explain grammar in Turkish with practical examples.

Avoid long abstract grammar chapters unless the learner requests them.

## PART 6 — PRESERVE AND IMPROVE THE EXISTING POMODORO SYSTEM

My existing project already has a Pomodoro-style study system.

It has:

- 25 minutes of focused study.
- 5 minutes of break.
- A daily goal of 100 focused minutes.
- Session tracking and progress monitoring.

I like this feature and want to preserve its existing useful implementation.

During the repository audit, identify the current Pomodoro implementation and all related functionality.

Do not remove or rewrite it unnecessarily.

Preserve and improve it within the new application.

The default daily target must remain 100 minutes of focused learning.

Use four 25-minute focus sessions, with 5-minute breaks between sessions.

Track focused study time separately from break time.

After the fourth session, allow an optional longer break.

## PART 7 — CONNECT POMODORO TO LEARNING ACTIVITIES

The four focus sessions should have suggested learning activities:

Session 1: Vocabulary and useful expressions.

Session 2: Sentence building, grammar in context, and controlled exercises.

Session 3: Listening comprehension, natural German, and pronunciation.

Session 4: Guided or independent speaking and review.

These are recommendations, not rigid restrictions. Allow personalization and changing session activities.

The timer should know which learning activity is being completed.

## PART 8 — PROGRESS TRACKING

Track both study consistency and actual language acquisition.

Pomodoro metrics:

- Daily focused minutes.
- Completed sessions.
- Weekly consistency.
- Monthly progress.
- Missed or interrupted sessions.

Language metrics:

- New words learned.
- Words actively used.
- Expressions remembered.
- Sentence-building ability.
- Listening comprehension.
- Speaking performance.
- Real-life scenario completion.
- Previously weak expressions successfully recalled.

Do not confuse time spent in the application with actual language proficiency.

## PART 9 — REQUIRED USER EXPERIENCE

The application must clearly show:

- Today's 100-minute goal.
- Current Pomodoro session.
- Remaining focus time.
- Remaining break time.
- Completed sessions.
- Recommended next learning activity.
- Vocabulary currently being learned.
- Personal weaknesses to review.

Keep the experience motivating but not childish.

## PART 10 — IMPLEMENTATION RULE

Integrate all these requirements into the approved product architecture and development roadmap.

During the repository audit, inspect the existing Pomodoro functionality and identify exactly what should be preserved.

Do not implement this as an isolated timer disconnected from learning.

The final system must combine vocabulary acquisition, sentence construction, listening, guided practice, independent speaking, spaced repetition, and Pomodoro tracking into one coherent learning experience.

Report how you will implement it before changing the existing project.