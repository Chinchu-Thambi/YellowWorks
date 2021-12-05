*** Settings ***
Documentation      Yellow Response Management Related Test Cases
Resource           customer_response_keywords.robot
Variables          customer_response_sitedata.py
Test Setup
...                Open browser and maximize
Test Teardown
...                Close Browser

*** Test Cases ***
TC_RM_01: Verify Business owner (Customer) can add a response to a live review
    [Tags]    TC_RM_01  codebuild_ready   regression_ready
    GIVEN Customer logs into the customer portal
    WHEN User clicks the My Products link from the left panel
        And User access the manage reviews page
        AND User clicks the reply button for the first review
        AND User submits the response
    THEN User should see the submited response with the pending approval label
    WHEN Yellow moderator access admin panel and approves the response
    THEN User should NOT see the submited response with the pending approval label
        AND Response should be visible to consumers on yellow website
        AND User should have recieved an email notification for the approved response
    WHEN Yellow moderator remove the response from the command center
    THEN Response should NOT be visible to consumers on yellow website
        AND User should NOT see the deleted response on manage reviews

TC_RM_02: Verify staff can add a response to a live review on behalf of the business owner (customer)
    [Tags]    TC_RM_02  codebuild_ready   regression_ready
    GIVEN Staff logs into the customer portal
    WHEN User clicks the My Products link from the left panel
        And User access the manage reviews page
        AND User clicks the reply button for the first review
        AND User submits the response
    THEN User should see the submited response with the pending approval label
    WHEN Yellow moderator access admin panel and approves the response
    THEN User should NOT see the submited response with the pending approval label
        AND Response should be visible to consumers on yellow website
    WHEN Yellow moderator remove the response from the command center
    THEN Response should NOT be visible to consumers on yellow website
        AND User should NOT see the deleted response on manage reviews
