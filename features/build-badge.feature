Feature: Build badge
  As a developer
  I want to see build metadata in the footer
  So that I can verify which version is deployed

  Scenario: Badge shows branch and commit
    Given I open the home page
    Then I should see the build badge
    And the badge shows a branch name
    And the badge shows a commit hash

  Scenario: Badge shows the environment label
    Given I open the home page
    Then the badge environment label is visible
