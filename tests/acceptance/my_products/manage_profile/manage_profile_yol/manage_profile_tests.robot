*** Settings ***
Documentation       Yellow Manage Profile Related Test Cases
Test Setup          Open browser and maximize
Test Teardown       run keywords
#...                 Mark LambdaTest Status
...                 Close Browser
Resource            manage_profile_keywords.robot

*** Test Cases ***
TC_MGT_PROF_01: Verify The UI Content For The Yellow Premium Profile
    [Tags]    codebuild_ready    TC_MGT_PROF_01    regression_suite
    GIVEN User has completed buying and product brief process with yellow premium profile
    WHEN User access the my products section
        AND User access manage profile for premium profile
    THEN User can view the contact information section for premium profile
        AND User can view additional information section for premium profile
        AND User can verify the status section shows the premium profile is live
        AND User can view the gallery section for premium profile
        AND User can view the manage categories section for premium profile
        AND User can view the main information section for premium profile

TC_MGT_PROF_02: Verify The UI Content For The Yellow Basic Profile
    [Tags]    codebuild_ready    TC_MGT_PROF_02    regression_suite
    GIVEN User has completed buying and product brief process with yellow basic profile
    WHEN User access the my products section
        AND User access manage profile for basic profile
    THEN User can view the contact information section for basic profile
        AND User can view additional information section for basic profile
        AND User can verify the status section shows the basic profile is live
        AND User can view the gallery section for basic profile
        AND User can view the manage categories section for basic profile
        AND User can view the main information section for basic profile

TC_MGT_PROF_03: Verify The Update Process For The Yellow Premium Profile
    [Tags]    codebuild_ready     TC_MGT_PROF_03    regression_suite
    GIVEN User has completed buying and product brief process with yellow premium profile
     WHEN User access the my products section
         AND User access manage profile for premium profile
    WHEN User update the contact information section for premium profile
        AND User update additional information section for premium profile
        AND User update the gallery section for premium profile
        AND User update the manage categories section for premium profile
        AND User update the main information section for premium profile
        AND User navigates to DLP of the profile
    THEN User verifies the updated contact information for premium profile is reflected in DLP
        AND User verifies the updated additional information for premium profile is reflected in DLP
        AND User verifies the updated gallery section for premium profile
        AND User verifies the updated manage categories section for premium profile
        AND  User verifies the updated main information section for premium profile
         AND User set the existing values back for premium profile

TC_MGT_PROF_04: Verify The Update Process For The Yellow Basic Profile
    [Tags]    codebuild_ready     TC_MGT_PROF_04    regression_suite
    GIVEN User has completed buying and product brief process with yellow basic profile
    WHEN User access the my products section
        AND User access manage profile for basic profile
    WHEN User update the contact information section for basic profile
        AND User update additional information section for basic profile
        AND User update the manage categories section for basic profile
        AND User update the main information section for basic profile
        AND User navigates to DLP of the profile
    THEN User verifies the updated contact information for basic profile is reflected in DLP
       AND User verifies the updated additional information for basic profile is reflected in DLP
        AND User verifies the updated manage categories section for basic profile
        AND User verifies the updated main information section for basic profile
        AND User set the existing values back for basic profile

TC_MGT_PROF_05: Verify removing the listing for premium profile
       [Tags]    codebuild_ready     TC_MGT_PROF_05    regression_suite
    GIVEN User has completed buying and product brief process with yellow premium profile
    WHEN User access the my products section
        AND User access manage profile for premium profile
        AND User scroll to see remove your listing option
    THEN User places the request to remove YOL profile with fourth option

TC_MGT_PROF_06: Verify the profile completion status feauture added for basic profile
        [Tags]    codebuild_ready     TC_MGT_PROF_06    regression_suite
    GIVEN User has completed buying and product brief process with yellow basic profile
    WHEN User access the my products section
        AND User access manage profile for basic profile
    THEN Profile completion status should be visible for user
    WHEN User adds the missing basic profile details
    THEN Go Premium button should be visible with 80% profile status
    WHEN User clicks on Go Premium, page navigates to corresponding manage plan page
        AND Setting the basic profile status back to original

TC_MGT_PROF_07: Verify the profile completion status feauture added for premium profile
    [Tags]    codebuild_ready     TC_MGT_PROF_07    regression_suite
    GIVEN User has completed buying and product brief process with yellow premium profile
     WHEN User access the my products section
         AND User access manage profile for premium profile
    THEN Profile completion status should be visible for user
    WHEN User adds the missing premium profile details
    THEN Profile completion status should not be visible for user
        AND Setting the premium profile status back to original

