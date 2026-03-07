# SPEC-MCP-009 Acceptance

## Scenario 1: Legacy placeholder license no longer breaks theme access

Given a stored active license with `theme_id: "default"`
When MCP auth is resolved
Then `licensedThemes` contains canonical current theme ids
And `/api/mcp/themes` returns a non-empty list

## Scenario 2: Trial all-access stays usable

Given a stored active trial license with `theme_id: "trial-all-access"`
When MCP auth is resolved
Then `licensedThemes` contains every canonical current theme id

## Scenario 3: Creator purchases stop writing default placeholder ids

Given a Paddle `transaction.completed` event for a creator purchase with no `theme_id`
When the webhook stores the license
Then it stores an explicit all-access theme id
And not `default`

## Scenario 4: Scoped purchases fail fast when theme_id is missing

Given a Paddle `transaction.completed` event for a single or double purchase with no `theme_id`
When the webhook is processed
Then the response is `400`
And no `default` placeholder license is written
