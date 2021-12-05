*** Settings ***
Documentation       Buy online journey for Yellow Products
Test Setup          Open browser and maximize
Test Teardown       run keywords
#...                 Mark LambdaTest Status
...                 Close Browser
Suite Teardown      Update Global Test Status
Resource            search_ads__buy_journey_keywords.robot

*** Test Cases ***
TC_SA_001_Verify buy Journey for Searchads without login
   [tags]  codebuild_ready     TC_SA_001
   GIVEN User is on searchads page
       AND Verify the searchads page
   WHEN Click GET STARTED button
     THEN Navigate to the onboarding journey for search ads
       AND User enter all the details
       AND User selects the consent
       AND User click next on business details
       AND Verify hubspot contact details
       AND User selects the business category
       AND User selects the business address
       AND User selects the prefered regions for their business
       AND User clicks next button
       AND User choose where your ads go
       AND User clicks next button
       WHEN User enter a link to your website
       AND User clicks next button
   WHEN User navigates to the reccomended Budget page
     THEN User change the recommended budget
       AND Verify the recommended budget total
       AND User clicks the book a callback
       AND User provide the phone number and the later time option to receive the call
   THEN Verify details in hubspot
       AND Verify the region details in hubspot
       AND User deletes the conatct record in hubspot

TC_SA_002_Verify buy Journey for Searchads without login with radius
   [tags]  codebuild_ready     TC_SA_002      regression_suite
   GIVEN User is on searchads page
       AND Verify the searchads page
   WHEN Click GET STARTED button
     THEN Navigate to the onboarding journey for search ads
       AND User enter all the details
       AND User selects the consent
       AND User click next on business details
       AND Verify hubspot contact details
       AND User selects the business category
       AND User selects the business address
       AND User selects the target location radius for their business
       AND User clicks next button
       AND User choose where your ads go
       AND User clicks next button
       WHEN User enter a link to your website
       AND User clicks next button
   WHEN User navigates to the reccomended Budget page
       AND Verify the recommended budget total
       AND User clicks the book a callback
       AND User provide the phone number and the now time option to receive the call
   THEN Verify details in hubspot
      AND Verify the radius details in hubspot
      AND User deletes the conatct record in hubspot

TC_SA_003_Verify buy Journey for Searchads without login with changed radius and budget
    [tags]  codebuild_ready     TC_SA_003     regression_suite
   GIVEN User is on searchads page
       AND Verify the searchads page
   WHEN Click GET STARTED button
     THEN Navigate to the onboarding journey for search ads
       AND User enter all the details
       AND User selects the consent
       AND User click next on business details
       AND Verify hubspot contact details
       AND User selects the business category
       AND User selects the business address
       AND User selects the target location radius for their business
       AND User change the targeted location radius
       AND User clicks next button
       AND User choose where your ads go
       AND User clicks next button
       WHEN User enter a link to your website
       AND User clicks next button
   WHEN User navigates to the reccomended Budget page
     THEN User change the recommended budget
       AND Verify the recommended budget total
       AND User clicks the book a callback
       AND User provide the phone number and the later time option to receive the call
   THEN Verify details in hubspot
      AND Verify the radius details in hubspot
      AND User deletes the conatct record in hubspot

TC_SA_004_Verify buy Journey for Searchads without login & region
    [tags]  codebuild_ready     TC_SA_004    regression_suite
   GIVEN User is on searchads page
       AND Verify the searchads page
   WHEN Click GET STARTED button
     THEN Navigate to the onboarding journey for search ads
       AND User enter all the details
       AND User selects the consent
       AND User click next on business details
       AND Verify hubspot contact details
       AND User selects the business category
       AND User selects the business address
       AND User clicks next button
       AND User choose where your ads go
       AND User clicks next button
       WHEN User enter a link to your website
       AND User clicks next button
   WHEN User navigates to the reccomended Budget page
     THEN User change the recommended budget
       AND Verify the recommended budget total
       AND User clicks the book a callback
       AND User provide the phone number and the later time option to receive the call
   THEN Verify details in hubspot
       AND User deletes the conatct record in hubspot

TC_SA_005_Verify the error messages for Searchads
   [tags]  codebuild_ready     TC_SA_005     regression_suite
   GIVEN User is on searchads page
       AND Verify the searchads page
   WHEN Click GET STARTED button
   THEN Navigate to the onboarding journey for search ads
       AND User enter all the details
       AND User selects the consent
       AND User click next on business details
       AND Verify hubspot contact details
       AND User selects the business category
       AND User selects the business address
       AND User selects the prefered regions for their business
       AND User clicks next button
       AND User choose where your ads go
       AND User clicks next button
       WHEN User enter a link to your website
       AND User clicks next button
   WHEN User navigates to the reccomended Budget page
   THEN User change the recommended budget
       AND Verify the recommended budget total
       AND User clicks the book a callback
   THEN User verifies the error message for business details page
       AND User enter the phone number & time and click book a call button
       AND Verify details in hubspot
       AND Verify the region details in hubspot
       AND User deletes the conatct record in hubspot

TC_SA_006_Verify buy Journey for Searchads with login
   [tags]  codebuild_ready     TC_SA_006
   GIVEN User Sign In as already registered
       AND User is on searchads page
       AND Verify the searchads page
   WHEN Click GET STARTED button
     THEN Navigate to the onboarding journey for search ads
       AND User selects the consent
       AND User click next on business details
       AND Verify hubspot contact details
       AND User selects the business category
       AND User selects the business address
       AND User selects the prefered regions for their business
       AND User clicks next button
       AND User choose where your ads go
       AND User clicks next button
       WHEN User enter a link to your website
       AND User clicks next button
   WHEN User navigates to the reccomended Budget page
     THEN User change the recommended budget
       AND Verify the recommended budget total
       AND User clicks the book a callback
       AND User provide the phone number and the now time option to receive the call
   THEN Verify details in hubspot
       AND Verify the region details in hubspot

TC_SA_007_Verify buy Journey for Searchads with login & without region
    [tags]  codebuild_ready     TC_SA_007     regression_suite
   GIVEN User Sign In as already registered
       AND User is on searchads page
       AND Verify the searchads page
   WHEN Click GET STARTED button
     THEN Navigate to the onboarding journey for search ads
       AND User selects the consent
       AND User click next on business details
       AND Verify hubspot contact details
       AND User selects the business category
       AND User selects the business address
       AND User clicks next button
       AND User choose where your ads go
       AND User clicks next button
       WHEN User enter a link to your website
       AND User clicks next button
   WHEN User navigates to the reccomended Budget page
     THEN User change the recommended budget
       AND Verify the recommended budget total
       AND User clicks the book a callback
       AND User provide the phone number and the later time option to receive the call
   THEN Verify details in hubspot

TC_SA_008_Verify buy Journey for Searchads with Facebook login
   [tags]  codebuild_ready     TC_SA_008     regression_suite
   GIVEN User Sign In with facebook
       AND User is on searchads page
       AND Verify the searchads page
   WHEN Click GET STARTED button
     THEN Navigate to the onboarding journey for search ads
       AND User selects the consent
       AND User click next on business details
       AND Verify hubspot contact details
       AND User selects the business category
       AND User selects the business address
       AND User selects the prefered regions for their business
       AND User clicks next button
       AND User choose where your ads go
       AND User clicks next button
       WHEN User enter a link to your website
       AND User clicks next button
   WHEN User navigates to the reccomended Budget page
     THEN User change the recommended budget
       AND Verify the recommended budget total
       AND User clicks the book a callback
       AND User provide the phone number and the later time option to receive the call
   THEN Verify details in hubspot
       AND Verify the region details in hubspot

TC_SA_009_Verify Add to cart for buy Journey for Searchads(website)
   [tags]  codebuild_ready     TC_SA_009  regression_suite
   GIVEN User is on searchads page
       AND Verify the searchads page
   WHEN Click GET STARTED button
   THEN Navigate to the onboarding journey for search ads
       AND User enter all the details
       AND User selects the consent
       AND User click next on business details
       AND Verify hubspot contact details
       AND User selects the business category
       AND User selects the business address
       AND User selects the prefered regions for their business
       AND User clicks next button
       AND User choose where your ads go
       AND User clicks next button
   WHEN User enter a link to your website
       AND User clicks next button
   WHEN User navigates to the reccomended Budget page
   THEN User change the recommended budget
       AND Verify the recommended budget total
       AND User clicks Add to cart button
       WHEN User able to sign up
       AND Cart, Company and Payment Details section should be available
    WHEN Add Business details
       And Add Payment details
       AND Select terms of business and card authorization
       AND Click on Confirm Order
    THEN User navigates to order confirmation page


TC_SA_0010_Verify buy Journey for Searchads with Google login
   [tags]  codebuild_ready     TC_SA_0010     regression_suite
   GIVEN User Sign In with google
       AND User is on searchads page
       AND Verify the searchads page
   WHEN Click GET STARTED button
     THEN Navigate to the onboarding journey for search ads
       AND User selects the consent
       AND User click next on business details
       AND Verify hubspot contact details
       AND User selects the business category
       AND User selects the business address
       AND User selects the prefered regions for their business
       AND User clicks next button
       AND User choose where your ads go
       AND User clicks next button
       WHEN User enter a link to your website
       AND User clicks next button
   WHEN User navigates to the reccomended Budget page
     THEN User change the recommended budget
       AND Verify the recommended budget total
       AND User clicks the book a callback
       AND User provide the phone number and the later time option to receive the call
   THEN Verify details in hubspot
       AND Verify the region details in hubspot


