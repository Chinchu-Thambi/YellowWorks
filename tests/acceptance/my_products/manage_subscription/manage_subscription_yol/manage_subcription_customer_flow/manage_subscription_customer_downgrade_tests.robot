*** Settings ***
Documentation       Yellow Profile Downgrade Related Test Cases - Customer Flow
Test Setup          Open browser and maximize
Test Teardown       run keywords
#...                 Mark LambdaTest Status
...                 Close Browser
Resource            ../manage_subscription_keywords.robot
Resource            ../../../product_brief/product_brief_yol_profile/product_brief_keywords.robot

*** Test Cases ***
TC_CUS_DWG_01: Verify A Customer Can Complete The Yellow Profile Downgrade Process
    [Tags]    codebuild_ready    TC_CUS_DWG_01
   GIVEN Purchase Yellow Premium+Gold profile for User
        AND User has completed the product brief process for the Premium+boost profile
    WHEN User access the Manage Plan page
       AND User verify the info available in Manage Plan Page
       AND Manually run the chatbot to end the trial
       AND Performs downgrade to Yellow Basic+Bronze profile by User
    THEN User is displayed with the thank you message
       AND Effective date for downgrade is displayed for User