Feature: Tickets booking
    Scenario: Should book one ticket
        Given user select "3" weekday for go cinema
        When user select "4" row and "5" place
        Then button became colored

    Scenario: Should book three tickets
        Given user select "5" weekday for go cinema with friends
        When user select "8" row and "5", "6", "7" places
        Then button became colored too

    Scenario: Shouldn't book
        Given user select "3" weekday
        When user select ocupied place
        Then button don't became colored