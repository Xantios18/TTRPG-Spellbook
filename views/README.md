# Table Top Role Playing Game (TTRPG) Spellbook

##### Description
Being a spellcaster in a TTRPG can be complicated, and requires a player to keep track of a lot of data. This app is designed to simplify that.

In its current state, it is written for Dungeons and Dragons Fifth Edition (D&D 5e), though it could be built out for other systems with different spellcasting schemas.

Additionally/alternatively, it is written only for keeping track of spells and spell slots. it could be built out to be a complete character sheet including stat-blocks and other abilities.

###### Enhancements
Presently, it requires the player to manually input all spell information. An obvious major enhancement would be to incorporate a library of existing spells for a player to simply choose from.

The spell slot trackers currently are not connected to the player model or otherwise tracked in the database, so they are not preserved if the character details page is left.
Once that functionality is incorporated, a "long rest" button should be added to restore all expended spell slots.

Along with the "long rest" functionality, a player should be able to prepare/unprepare spells from their character details page, rather than editing the spell directly. Ideally, a form would pop up whenever the long rest button is pushed, but until that is implemented, a button alongside each spell would do.

The above functionalities would be particularly useful for classes like Cleric and Druid, who always have access to their entire spells list, but prepare new spells each day. The app overall was designed with a more Wizard focused outlook.

Perhaps a future build could customized each character page even further based on class.

##### Getting Started

###### Planning Document
https://trello.com/b/Uco5NrVs/men-stack-crud-app-project

###### Deployment
TBD

###### Technologies
Javascript
Express/EJS
MongoDB/Mongoose
bcrypt
method_override