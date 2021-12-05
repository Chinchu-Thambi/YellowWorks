*** Settings ***
Documentation       Buy online journey for Yellow Products
Test Setup          Open browser and maximize
Test Teardown       run keywords
#...                 Mark LambdaTest Status
...                 Close Browser
Suite Teardown      Update Global Test Status
Resource            products_keywords_sbj.robot
Resource            stripe_keywords.robot
Resource            hubspot_api_keywords.robot
Resource            axle_keywords.robot

*** Test Cases ***
TC_SBO_001_Verify Buying Yellow Basic Profile Product
    [tags]  codebuild_ready     TC_SBO_001    regression_ready
    GIVEN User selects Choose Yellow Profile from the Products
        AND Add to the cart button disabled
    WHEN Selected Base Profile
        AND Click Purchase
    THEN User able to sign up
        AND Cart and Company Details section should be available
        AND Payment details section should not be available
    WHEN Add Business details
        AND Cart summary should be accurate for "Base Profile" with "0" price in row "1" in the cart
        AND Verify the Actual Calculated amount plus GST
        AND Verify the pro rata amounts are not empty when 1 profile and 0 categories
        AND Select terms of business authorization
        AND Click on Confirm Order
    THEN User navigates to order confirmation page
        AND User get all required hubspot details through api with amount
        AND Deleting Contact, Company and Deal records is successful

TC_SBO_002_Verify Buying Yellow Premium Profile Product
    [tags]  codebuild_ready     TC_SBO_002    regression_ready
    GIVEN User selects Choose Yellow Profile from the Products
    WHEN Select Premium Profile
        AND Click Purchase
    THEN User able to sign up
        AND Cart, Company and Payment Details section should be available       #Discount code section to be added       #Discount code section to be added
    WHEN Add Business details
        AND Add Payment details
        AND Cart summary should be accurate for "Premium Profile" with "20" price in row "1" in the cart
        AND Verify the Actual Calculated amount plus GST
        AND Verify the pro rata amounts are not empty when 1 profile and 0 categories
        AND Select terms of business and card authorization
        AND Click on Confirm Order
    THEN User navigates to order confirmation page
        AND User get all required hubspot details through api with amount                 #valid for 3 months and than have to change back to aSBOve line of code
        AND New user card information should be captured in Stripe
        AND Deleting Contact, Company and Deal records is successful

TC_SBO_003_Verify Buying Yellow Premium Profile Product with Gold Category Sponsorship
    [tags]  codebuild_ready    TC_SBO_003    regression_ready
    GIVEN User selects Choose Yellow Profile from the Products
    WHEN Select Premium Profile
        AND Select Gold Category Sponsorship
        AND Click Purchase
    THEN User able to sign up
        AND Cart, Company and Payment Details section should be available       #Discount code section to be added
    WHEN Add Business details
        AND Add Payment details
        AND Cart summary should be accurate for "Premium Profile" with "20" price in row "1" in the cart
        AND Cart summary should be accurate for "Gold Category Boost" Sponsorship with "110" price in row "2" in the cart
        AND Verify the Actual Calculated amount plus GST
        AND Verify the pro rata amounts are not empty when 1 profile and 1 category
        AND Select terms of business and card authorization
        AND Click on Confirm Order
    THEN User navigates to order confirmation page
        AND User get all required hubspot details through api with amount
        AND New user card information should be captured in Stripe
        AND Deleting Contact, Company and Deal records is successful

TC_SBO_004_Verify Buying Yellow Basic Profile Product with Gold Category Sponsorship
    [tags]  codebuild_ready     TC_SBO_004   regression_ready
    GIVEN User selects Choose Yellow Profile from the Products
    WHEN Selected Base Profile
        AND Select Gold Category Sponsorship
        AND Click Purchase
    THEN User able to sign up
        AND Cart, Company and Payment Details section should be available       #Discount code section to be added
    WHEN Add Business details
        AND Add Payment details
        AND Cart summary should be accurate for "Base Profile" with "0" price in row "1" in the cart
        AND Cart summary should be accurate for "Gold Category" Sponsorship with "110" price in row "2" in the cart
        AND Verify the Actual Calculated amount plus GST
        AND Verify the pro rata amounts are not empty when 1 profile and 1 category
        AND Select terms of business and card authorization
        AND Click on Confirm Order
    THEN User navigates to order confirmation page
        AND User get all required hubspot details through api with amount
        AND New user card information should be captured in Stripe
        AND Deleting Contact, Company and Deal records is successful

TC_SBO_005_Verify Invalid Verification Code while Buying Products
    [tags]  codebuild_ready     TC_SBO_005
    GIVEN User selects Choose Yellow Profile from the Products
    WHEN Selected Base Profile
        AND Select Silver Category Sponsorship
        AND Click Purchase
        AND User access sign up screen
        AND User signs up using a generic email address and valid user information
        AND User redirects to the activation panel
        AND User receives an email notification for user registration
        AND User enters an invalid verification code
    THEN User can see the error message on registration screen "Invalid authorization code"
    WHEN User successfully activate the account with a valid activation code
        AND User gets the activation success message
        AND User automatically signed in successfully on checkout page
        AND Cart, Company and Payment Details section should be available       #Discount code section to be added
        AND Add Business details
        AND Add Payment details
    THEN Cart summary should be accurate for "Base Profile" with "0" price in row "1" in the cart
        AND Cart summary should be accurate for "Silver Category" Sponsorship with "60" price in row "2" in the cart
        AND Verify the Actual Calculated amount plus GST
        AND Verify the pro rata amounts are not empty when 1 profile and 1 category
        AND Select terms of business and card authorization
        AND Click on Confirm Order
    THEN User navigates to order confirmation page

TC_SBO_006_Verify User Can Sign In For New Business while Buying Products
    [tags]  codebuild_ready     TC_SBO_006    regression_ready
    GIVEN User selects Choose Yellow Profile from the Products
        AND Select Premium Profile
        AND Click Purchase
     WHEN User sign in
     THEN Logged in user should be accurate
        AND User clicks on proceed with purchase
        AND Cart, Company and Payment Details section should be available       #Discount code section to be added
        AND Cart summary should be accurate for "Premium Profile" with "20" price in row "1" in the cart
        AND Verify the Actual Calculated amount plus GST
        AND Verify the pro rata amounts are not empty when 1 profile and 0 categories
        AND Select terms of business and card authorization
        AND Click on Confirm Order
    THEN User navigates to order confirmation page
        AND Deleting Deal record is successful

TC_SBO_007_Verify User Can Perform Forgot Password while Buying Products
    [tags]  codebuild_ready_defect_007      TC_SBO_007   codebuild_ready
    GIVEN User has created and activated a new account before buying
        AND User selects Choose Yellow Profile from the Products
    WHEN Select Premium Profile
        AND Click Purchase
        AND User perform forgot password while buying products
        AND Cart, Company and Payment Details section should be available       #Discount code section to be added
    WHEN Add Business details
        AND Add Payment details
        AND Select terms of business and card authorization
        AND Click on Confirm Order
    THEN User navigates to order confirmation page

TC_SBO_008_Verify user can buy products with social login - Facebook
    [tags]  codebuild_ready_defect     TC_SBO_008    regression_ready  codebuild_ready
    GIVEN User selects Choose Yellow Profile from the Products
    WHEN Select Premium Profile
        AND Select Bronze Category Sponsorship
        AND Click Purchase
    WHEN User log in using Facebook credentials
        AND User clicks on proceed with purchase
    THEN Cart, Company and Payment Details section should be available     #Discount code section to be added
        AND Get already register user details
        AND Cart summary should be accurate for "Premium Profile" with "20" price in row "1" in the cart
        AND Cart summary should be accurate for "Bronze Category" Sponsorship with "30" price in row "2" in the cart
        AND Verify the Actual Calculated amount plus GST
        AND Verify the pro rata amounts are not empty when 1 profile and 1 category
        AND Select terms of business and card authorization
        AND Click on Confirm Order
    THEN User navigates to order confirmation page
        AND User get all required hubspot details through api with amount
        AND New user card information should be captured in Stripe
        AND Deleting Deal record is successful

TC_SBO_009_Verify user can buy products with social login - Google
    [tags]  codebuild_ready_defect     TC_SBO_009   regression_ready  codebuild_ready
    GIVEN User selects Choose Yellow Profile from the Products
    WHEN Select Premium Profile
        AND Select Gold Category Sponsorship
        AND Click Purchase
        AND User log in using Google credentials
        AND User clicks on proceed with purchase
    THEN Cart, Company and Payment Details section should be available
        AND Set the variables test
        AND Cart summary should be accurate for "Premium Profile" with "20" price in row "1" in the cart
        AND Cart summary should be accurate for "Gold Category" Sponsorship with "110" price in row "2" in the cart
        AND Verify the Actual Calculated amount plus GST
        AND Verify the pro rata amounts are not empty when 1 profile and 1 category
        AND Select terms of business and card authorization
        AND Click on Confirm Order
    THEN User navigates to order confirmation page
        AND User get all required hubspot details through api with amount
        AND New user card information should be captured in Stripe
        AND Deleting Deal record is successful