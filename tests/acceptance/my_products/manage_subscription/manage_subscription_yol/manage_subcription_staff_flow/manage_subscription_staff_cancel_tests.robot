*** Settings ***
Documentation       Yellow Profile Cancellation Related Test Cases - Staff Flow
Resource            ../manage_subscription_keywords.robot

*** Test Cases ***
TC_STF_CAC_01: Verify Yellow Staff Can Complete The Yellow Profile Cancellation Process
    [Tags]    codebuild_in_progress     TC_STF_CAC_01
    GIVEN User has completed a buying journey for a premium yellow profile
        AND User has completed the product brief process for the free yellow profile
    WHEN Staff access the my products
        AND User select the updrage downgrade option yellow profile
        AND User perform update yellow free profile
        AND User clicks remove yellow profile on Change profile type screen
        AND User confirm with a reason to remove the profile product
    THEN User will display the message Almost there
        AND User can see the Cancellation Request Received label next to the updated yellow profile
        AND User will receive a confirmation email for thh yellow profile cancellation
    THEN
TC_STF_CAC_02: Verify Yellow Staff Can Complete The Yellow Category Sponsorship Cancellation Process
    [Tags]    codebuild_in_progress     TC_STF_CAC_02
    GIVEN User has completed a buying journey for a free yellow profile with silver yellow category sponsorship
        AND User has completed the product brief process for the free yellow profile with silver yellow category sponsorship
    WHEN Staff access the my products
        AND User select the updrage downgrade option yellow profile
        AND User perform update on silver yellow category sponsorship
        AND User click remove at current subscription section
        AND User confirm with a reason to remove category sponsorship
    THEN User can see the REMOVED label next to the updated yellow category sponsorship
        AND User can see the UNDO button next to the updated yellow category sponsorship
        AND User can complete the cancellation process from the Summary of Changes section
        AND User will display the thank you message
        AND User will receive a confirmation email for thh yellow profile cancellation