*** Settings ***
Documentation       Suite description
Variables           manage_profile_sitedata.py
Resource            ../../../product_brief/product_brief_yol_profile/product_brief_keywords.robot
Resource            ../../../account_settings/account_settings_keywords.robot

*** Keywords ***
User has completed buying and product brief process with yellow ${profile} profile
    User login to customer portal

User access the my products section
    Sleep   5s
    Wait Until Page Contains Element    ${my_products_link_LHS}
    Click Element    ${my_products_link_LHS}

User access manage profile for ${profile} profile
    Wait until Element is Visible    ${my_products_registered_user_premium_profile_manageprofile}
    Run Keyword If    "${profile}" == "premium"    Click Element    ${my_products_registered_user_premium_profile_manageprofile}
    ...      ELSE    Click Element    ${my_products_registered_user_basic_profile_manageprofile}

##--------------------------------------------------------------------------------------------------------
#View profile completion status
##--------------------------------------------------------------------------------------------------------
Profile completion status should be visible for user
    Wait until Element is Visible    ${manage_profile_profile_completion_status}

Profile completion status should not be visible for user
    Wait until Element is Not Visible    ${manage_profile_profile_completion_status}

User adds the missing ${profile} profile details
    ${add_link_logo}    Get Text     ${manage_profile_add_link}
    Set Global Variable     ${add_link_logo}
    Sleep   2s
    Run Keyword If    "${add_link_logo}" == "ADD BUSINESS LOGO"    Run Keywords    User edit the business logo
    Wait Until Page Does Not Contain Element    ${manage_profile_saved_successfully_msg}
    Sleep  2s
    ${is_element_visible}=    Run Keyword And Return Status    Element Should Be Visible    ${manage_profile_add_link}
    Run Keyword If    ${is_element_visible} and "${profile}" == "premium"    Run Keywords    User edit image
    ...    AND    User edit video

Go Premium button should be visible with 80% profile status
    Verify page contain element:    //button[contains(text(),'Go Premium')]
    ${manage_profile_current_profile_percentage}    Get Text    ${manage_profile_profile_completion_percentage}
    Set Global Variable     ${manage_profile_current_profile_percentage}
    Should be True    "${manage_profile_current_profile_percentage}" == "80%"

User clicks on Go Premium, page navigates to corresponding manage plan page
    Click Element    ${manage_profile_gopremium_button}
    Sleep  1s
    Location Should Be    https://sandbox.beta.yellow.co.nz/my-yellow/my-products/manage-plan/4aa26ee0-6ae3-58c0-a029-125ceb7ea183
    Wait until Element is Visible    ${welcome_modal_close_icon}
    Click Element     ${welcome_modal_close_icon}

##---------------------------------------------------------------------------------------------------------
#View manage profile page sections
##---------------------------------------------------------------------------------------------------------
User can view the contact information section for ${profile} profile
    Wait until Element is Visible    ${manage_profile_edit_your_profile_info_title}
    Verify page contain element:    ${manage_profile_edit_your_profile_info_title}
    Verify page contain element:    ${manage_profile_tradingname_title}
    Run Keyword If    "${profile}" == "premium"     Verify page contain element:    ${manage_profile_legalbusinessname_title}
    ...     ELSE    Verify page contain element:    ${manage_profile_legalbusinessname_withcrown_title}
    Verify page contain element:    ${manage_profile_physicallocation_title}
    Verify page contain element:    ${manage_profile_physicaladdress_show_title}
    Verify page contain element:    ${manage_profile_serviceareas_title}
    Verify page contain element:    ${manage_profile_phonenumber_title}
    Verify page contain element:    ${manage_profile_emailaddress_title}
    Verify page contain element:    ${manage_profile_websiteurl_title}

User can view additional information section for ${profile} profile
    Scroll to Element to View    ${manage_profile_edityouradditionalinfo_title}
    Verify page contain element:    ${manage_profile_edityouradditionalinfo_title}
    Run Keyword If    "${profile}" == "premium"    Wait until element is visible    ${manage_profile_teammembers_title}
    Run Keyword If    "${profile}" == "premium"    Verify page contain element:    ${manage_profile_teammembers_title}
    ...    ELSE    Verify page contain element:     ${manage_profile_teammembers_withcrown_title}
    Run Keyword If    "${profile}" == "premium"    Verify page contain element:    ${manage_profile_freewifi_title}
    ...    ELSE    Verify page contain element:     ${manage_profile_freewifi_withcrown_title}
    Verify page contain element:    ${manage_profile_parking_title}
    Verify page contain element:    ${manage_profile_yearestablished_title}
    Run Keyword If    "${profile}" == "premium"    Verify page contain element:    ${manage_profile_socialmedia_title}
    ...    ELSE    Verify page contain element:     ${manage_profile_socialmedia_withcrown_title}

User can verify the status section shows the ${profile} profile is live
    Verify page contain element:    ${manage_profile_viewyourprofile_title}

User can view the gallery section for ${profile} profile
    Run Keyword If    "${profile}" == "premium"    Verify page contain element:    ${manage_profile_edityourgallery_title}
    ...    ELSE    Verify page contain element:    ${manage_profile_edityourgallery_withcrown_title}
    Verify page contain element:    ${manage_profile_image_add_button}
    Verify page contain element:    ${manage_profile_video_add_button}

User can view the manage categories section for ${profile} profile
    Verify page contain element:    ${manage_profile_manageyourcategories_title}

User can view the main information section for ${profile} profile
    Scroll To Bottom Of The Page
    Verify page contain element:    ${manage_profile_edityourmaininfo_title}
    Verify page contain element:    ${manage_profile_businesshours_title}
    Verify page contain element:    ${manage_profile_keywords_title}
    Verify page contain element:    ${manage_profile_businessdescription_title}
    Run Keyword If    "${profile}" == "premium"    Verify page contain element:    ${manage_profile_paymentoption_title}
    ...    ELSE    Verify page contain element:     ${manage_profile_paymentoption_withcrown_title}
    Run Keyword If    "${profile}" == "premium"    Verify page contain element:    ${manage_profile_bannerimage_title}
    ...    ELSE    Verify page contain element:     ${manage_profile_bannerimage_withcrown_title}
    Run Keyword If    "${profile}" == "premium"    Verify page contain element:    ${manage_profile_whatmakesusdiff_title}
    ...    ELSE    Verify page contain element:     ${manage_profile_whatmakesusdiff_withcrown_title}

##---------------------------------------------------------------------------------------------------------
#Update in Manage Profile - Edit Your Profile Info section
##---------------------------------------------------------------------------------------------------------
User update the contact information section for ${profile} profile
    User can view the contact information section for ${profile} profile
    User edit the business logo
    User edit Trading Name
    Run Keyword If    "${profile}" == "premium"    User edit Legal Business Name
    User edit Physical location
    User edit Physical location toggle
    User edit Service areas
    User edit Phone Numbers
    User edit Email address
    User edit Website URL

User edit the business logo
    Wait Until Page Contains Element    ${manage_profile_business_addlogo_img}
    Click Element    ${manage_profile_business_addlogo_img}
    Wait Until Page Contains Element    ${manage_profile_logo_browsefiles}
    Sleep    3s
    ${businesslogo_path}    Set Variable    ${CURDIR}${/}${manage_profile_business_logo1}
    Choose File    ${manage_profile_logo_input}    ${businesslogo_path}
    Sleep    5s
    Wait Until Element Is Visible    ${manage_profile_edit_save_button}
    Click Element    ${manage_profile_edit_save_button}
    Sleep    3s

User edit Trading Name
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Sleep    2s
    Click Element    ${manage_profile_tradingname_edit_link}
    Click Element    ${manage_profile_tradingname_input}
    ${manage_profile_existing_tradingname}    Get Element Attribute    ${manage_profile_tradingname_input}    attribute=value
    Set Global Variable    ${manage_profile_existing_tradingname}
    ${Trading_name} =    Generate Random String    1    [UPPER]
    Input Text    ${manage_profile_tradingname_input}    ${manage_profile_existing_tradingname} ${Trading_name}
    ${manage_profile_updated_Trading_name}     Get Element Attribute    ${manage_profile_tradingname_input}    attribute=value
    Set Global Variable    ${manage_profile_updated_Trading_name}
    Click Element    ${manage_profile_edit_save_button}

User edit Legal Business Name
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Sleep  2s
    Click Element    ${manage_profile_legalbusinessname_edit_link}
    Wait until element is visible    ${manage_profile_legaltradingname_input}
    Click Element    ${manage_profile_legaltradingname_input}
    Sleep  2s
    ${manage_profile_existing_legalname}    Get Element Attribute    ${manage_profile_legaltradingname_input}    attribute=value
    Set Global Variable    ${manage_profile_existing_legalname}
    ${Legal_trading_name} =    Generate Random String    1    [UPPER]
    Input Text    ${manage_profile_legaltradingname_input}    ${manage_profile_existing_legalname} ${Legal_trading_name}
    ${manage_profile_updated_Legal_trading_name}    Get Element Attribute    ${manage_profile_legaltradingname_input}    attribute=value
    Set Global Variable    ${manage_profile_updated_Legal_trading_name}
    Click Element    ${manage_profile_edit_save_button}

User edit Physical location
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    ${manage_profile_existing_physical_address}    Get Text    ${manage_profile_current_physical_location}    ##604 Great South Road, Ellerslie, 1051, Auckland, Auckland
    Set Global Variable    ${manage_profile_existing_physical_address}
    Click Element    ${manage_profile_physicallocation_edit_link}
    Click Element    ${manage_profile_search_new_address}
    Click Element    ${manage_profile_input_new_address}
    Sleep    1s
    Input Text    ${manage_profile_input_new_address}    69 Hall Avenue    ##69 Hall Avenue, Mangere, 2022, Auckland, Auckland
    Press Key     ${manage_profile_input_new_address}    \\32
    Sleep    1s
    Click Element And Wait For Another Element    ${manage_profile_select_new_address}    ${manage_profile_physical_address_save}
    Click Element    ${manage_profile_physical_address_save}

User edit Physical location toggle
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Sleep  2s
    Wait Until Element is Visible    ${manage_profile_physicaladdress_show_radiobutton}
    Click Element    ${manage_profile_physicaladdress_show_radiobutton}    #Setting to Yes
    Element Attribute Value Should Be    ${manage_profile_physicallocation_toggle_yes}    style    opacity: 0;

User edit Service areas
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Sleep    2s
    Click Element    ${manage_profile_serviceareas_edit_link}
    Click Element    ${manage_profile_servicearea_allNZ_option}
    Sleep    1s
    Click Element    ${manage_profile_edit_save_button2}
    Sleep   1s
    Click Element    ${manage_profile_edit_save_button2}     #adding save as it's not saving due to category boost not displayed on the profile.
    Sleep  2s

User edit Phone Numbers
     Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
     Sleep    2s
     Click Element    ${manage_profile_phonenumber_edit_link}
     Click Element    ${manage_profile_phonenumber_number_input}
     ${manage_profile_existing_phonenumber}    Get Element Attribute    ${manage_profile_phonenumber_number_input}    attribute=value
     Set Global Variable    ${manage_profile_existing_phonenumber}
     ${phone_number} =    Generate Random String    8    [NUMBERS]
     Input Text    ${manage_profile_phonenumber_number_input}   ${phone_number}
     ${manage_profile_updated_phonenumber}    Get Element Attribute    ${manage_profile_phonenumber_number_input}     attribute=value
     Set Global Variable    ${manage_profile_updated_phonenumber}
     Wait Until Element is Visible    ${manage_profile_edit_save_button2}
     Click Element    ${manage_profile_edit_save_button2}

User edit Email address
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Sleep    2s
    Click Element    ${manage_profile_emailaddress_edit_link}
    Click Element    ${manage_profile_emailaddress_input}
    ${manage_profile_existing_emailaddress}    Get Element Attribute    ${manage_profile_emailaddress_input}     attribute=value
    Set Global Variable    ${manage_profile_existing_emailaddress}
    ${email_address_random} =    Generate Random String    1    [NUMBERS]
    Input Text    ${manage_profile_emailaddress_input}   signinyellowemail01${email_address_random}@mailinator.com
    ${manage_profile_updated_email_address}    Get Element Attribute    ${manage_profile_emailaddress_input}     attribute=value
    Set Global Variable    ${manage_profile_updated_email_address}
    Click Element    ${manage_profile_edit_save_button}

User edit Website URL
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Sleep    2s
    Click Element    ${manage_profile_websiteurl_edit_link}
    Click Element    ${manage_profile_websiteurl_input}
    ${manage_profile_existing_websiteURL}    Get Element Attribute    ${manage_profile_websiteurl_input}     attribute=value
    Set Global Variable    ${manage_profile_existing_websiteURL}
    ${websiteurl_random} =    Generate Random String    1    [NUMBERS]
    Input Text    ${manage_profile_websiteurl_input}   http://www.testonlinecustomer2020${websiteurl_random}.com
    ${manage_profile_updated_websiteURL}    Get Element Attribute    ${manage_profile_websiteurl_input}     attribute=value
    Set Global Variable    ${manage_profile_updated_websiteURL}
    Click Element    ${manage_profile_edit_save_button}

##---------------------------------------------------------------------------------------------------------
#Update in Manage Profile - Additional Info section
##---------------------------------------------------------------------------------------------------------
User update additional information section for ${profile} profile
    User can view additional information section for ${profile} profile
    Run Keyword If    "${profile}" == "premium"    User edit team members
    Run Keyword If    "${profile}" == "premium"    User edit Free-wifi
    User edit Parking
    User edit Year Etablished
    Run Keyword If    "${profile}" == "premium"    User edit Social Media Links

User edit team members
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Sleep  2s
    Click Element    ${manage_profile_teammembers_edit_link}
    Sleep  2s
    Click Element    ${manage_profile_teammember1_edit_link}
    Click Element    ${manage_profile_teammember1_lastname_input}
    ${manage_profile_existing_teammember1_lastname}    Get Element Attribute    ${manage_profile_teammember1_lastname_input}     attribute=value
    Set Global Variable    ${manage_profile_existing_teammember1_lastname}
    ${teammenber1_lastname_random} =    Generate Random String    1    [NUMBERS]
    Input Text    ${manage_profile_teammember1_lastname_input}    ${manage_profile_existing_teammember1_lastname}${teammenber1_lastname_random}
    ${manage_profile_updated_teammember1_lastname}    Get Element Attribute    ${manage_profile_teammember1_lastname_input}     attribute=value
    Set Global Variable    ${manage_profile_updated_teammember1_lastname}
    Scroll to Element to View    ${manage_profile_edit_save_button}
    Click Element    ${manage_profile_edit_save_button}
    Click Element   ${manage_profile_edit_close_button}

User edit Free-wifi
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Sleep  2s
    Click Element    ${manage_profile_freewifi_radio_button}  ##set to Yes

User edit Parking
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Click Element    ${manage_profile_parking_edit_link}
    Click Element    ${manage_profile_parking_dropdown}
    Click Element    ${manage_profile_parking_free_Offstreet}
    Click Element    ${manage_profile_edit_save_button}

User edit Year Etablished
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Sleep    2s
    Click Element    ${manage_profile_yearestablished_edit_link}
    Click Element    ${manage_profile_yearestablished_input}
    ${manage_profile_existing_yearestablished}    Get Element Attribute    ${manage_profile_yearestablished_input}     attribute=value   ##1999
    Set Global Variable    ${manage_profile_existing_yearestablished}
    Input Text    ${manage_profile_yearestablished_input}    2020
    ${manage_profile_updated_yearestablished}    Get Element Attribute    ${manage_profile_yearestablished_input}     attribute=value    ##2020
    Set Global Variable    ${manage_profile_updated_yearestablished}
    Click Element    ${manage_profile_edit_save_button}

User edit Social Media Links
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Scroll to Element to View    ${manage_profile_socialmedia_edit_link}
    Click Element    ${manage_profile_socialmedia_edit_link}
    Wait until element is visible    ${manage_profile_socialmedia_youtube_input}
    Click Element    ${manage_profile_socialmedia_youtube_input}
    ${manage_profile_existing_youtube_input}    Get Element Attribute    ${manage_profile_socialmedia_youtube_input}     attribute=value   ##http://www.youtube.com
    Set Global Variable    ${manage_profile_existing_youtube_input}
    Input Text    ${manage_profile_socialmedia_youtube_input}    https://www.youtube.com/watch?v=2a4Uxdy9TQY
    ${manage_profile_updated_youtube_input}    Get Element Attribute    ${manage_profile_socialmedia_youtube_input}     attribute=value    ##https://www.youtube.com/watch?v=2a4Uxdy9TQY
    Set Global Variable    ${manage_profile_updated_youtube_input}
    Click Element    ${manage_profile_edit_save_button}

##---------------------------------------------------------------------------------------------------------
#Update in Manage Profile - Gallery section
##---------------------------------------------------------------------------------------------------------
User update the gallery section for ${profile} profile
    Scroll to Element to View      ${manage_profile_edityourgallery_title}
    User can view the gallery section for ${profile} profile
    User edit image
    User edit video

User edit image
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Click Element    ${manage_profile_image_add_button}
    Wait Until Element Is Visible    ${manage_profile_gallery_image_addbutton}
    ${image_path}    Set Variable    ${CURDIR}${/}${manage_profile_business_logo1}
    Sleep    3s
    Choose File      ${manage_profile_gallery_image_video_input}    ${image_path}
    Sleep    3s
    Wait Until Element is Visible    ${manage_profile_edit_save_button2}
    Click Element    ${manage_profile_edit_save_button2}

User edit video
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Wait Until Element Is Visible    ${manage_profile_gallery_edit_link}
    sleep    2s
    Click Element    ${manage_profile_gallery_edit_link}
    Wait Until Element Is Visible    ${manage_profile_gallery_video_addbutton}
    Click Element    ${manage_profile_gallery_video_addbutton}
    Input Text    ${manage_profile_gallery_video_input}    https://www.youtube.com/watch?v=2a4Uxdy9TQY
    Wait Until Element is Visible    ${manage_profile_edit_save_button2}
    Click Element    ${manage_profile_edit_save_button2}

##---------------------------------------------------------------------------------------------------------
#Update in Manage Profile - Manage Categories section
##---------------------------------------------------------------------------------------------------------
User update the manage categories section for ${profile} profile
    Scroll to Element to View      ${manage_profile_manageyourcategories_title}
    User edit business category and category boost for ${profile}

User edit business category and category boost for ${profile}
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    ${manage_profile_existing_category}    Get Text    ${manage_profile_category_current_value}
    Set Global Variable    ${manage_profile_existing_category}
    Click Element    ${manage_profile_categories_edit_link}
    Click Element    ${manage_profile_categories_dropdown}
    Sleep    2s
    Run keyword if    "${profile}" == "premium"    Click Element    ${manage_profile_category_beauty_therapy_select}
    ...    ELSE    Run Keywords    Sleep    2s
    ...    AND    Click Element    ${manage_profile_category_plumbers_select}
    Click Element    ${manage_profile_edit_save_button}
    Sleep    2s
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Click Element    ${manage_profile_categoryboost_edit_link}
    Click Element    ${manage_profile_categoryboost_dropdown}
    Sleep    2s
    Run keyword if    "${profile}" == "premium"    Click Element    ${manage_profile_category_beauty_therapy_select}
    ...    ELSE    Run Keywords    Sleep    2s
    ...    AND    Click Element    ${manage_profile_category_plumbers_select}
    Click Element    ${manage_profile_edit_save_button}
    ${manage_profile_updated_category}    Get Text    ${manage_profile_category_current_value}
    Set Global Variable    ${manage_profile_updated_category}

##---------------------------------------------------------------------------------------------------------
#Update in Manage Profile - Main Information section
##---------------------------------------------------------------------------------------------------------
User update the main information section for ${profile} profile
    Scroll to Element to View      ${manage_profile_edityourmaininfo_title}
    User edit business hours for ${profile}
    User edit keywords
    User edit business description for ${profile}
    Run Keyword If    "${profile}" == "premium"    User edit payment options
    Run Keyword If    "${profile}" == "premium"    User edit banner image
    Run Keyword If    "${profile}" == "premium"    User edit what makes us different for ${profile}

User edit business hours for ${profile}
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Click Element    ${manage_profile_businesshours_edit_link}
    ${manage_profile_existing_monday_businesshours}    Get Text    ${manage_profile_monday_businesshours_value}
    Set Global Variable    ${manage_profile_existing_monday_businesshours}
    Click Element    ${manage_profile_maininfo_dropdown}
    Click Element    ${manage_profile_businesshours_24hours}
    ${manage_profile_updated_monday_businesshours}    Get Text    ${manage_profile_monday_businesshours_value}
    Set Global Variable    ${manage_profile_updated_monday_businesshours}
    Run keyword if    "${profile}" == "premium"    Click Element And Wait For Another Element    ${manage_profile_edit_save_button}    ${manage_profile_keywords_edit_link}
    ...    ELSE    Click Element    ${manage_profile_edit_save_button}

User edit keywords
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Sleep    2s
    Click Element    ${manage_profile_keywords_edit_link}
    Wait until element is visible    ${manage_profile_maininfo_dropdown}
    Click Element    ${manage_profile_maininfo_dropdown}
    Click Element    ${manage_profile_keywords_dropdown_firstoption}
    Click Element    ${manage_profile_edit_save_button}
    Sleep    2s
    Scroll to Element to View    ${manage_profile_keywords_fisrtoption_selected}
    ${keyword_firstoption_selected}    Get Text    ${manage_profile_keywords_fisrtoption_selected}
    Set Global Variable    ${keyword_firstoption_selected}

User edit business description for ${profile}
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Scroll to Element to View    ${manage_profile_businessdescription_edit_link}
    Click Element    ${manage_profile_businessdescription_edit_link}
    ${manage_profile_existing_businessdescription}    Get Text    ${manage_profile_businessdescription_input}    ##Test description of Yellow Premium+GLD profile for Test Online Customer2020 ##Test description of Basic+BRNZ for Test Online Customer2020
    Set Global Variable    ${manage_profile_existing_businessdescription}
    Input Text    ${manage_profile_businessdescription_input}    test
    ${manage_profile_updated_businessdescription}    Get Text    ${manage_profile_businessdescription_input}
    Set Global Variable    ${manage_profile_updated_businessdescription}
    Run keyword if    "${profile}" == "premium"    Click Element And Wait For Another Element   ${manage_profile_edit_save_button}    ${manage_profile_paymentoption_edit_link}
    ...    ELSE    Click Element    ${manage_profile_edit_save_button}

User edit payment options
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Scroll to Element to View    ${manage_profile_paymentoption_edit_link}
    Sleep    1s
    Click Element    ${manage_profile_paymentoption_edit_link}
    Click Element    ${manage_profile_maininfo_dropdown}
    Sleep    1s
    Click Element    ${manage_profile_paymentoptions_dd}
    Click Element    ${manage_profile_edit_save_button}

User edit banner image
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Scroll to Element to View    ${manage_profile_bannerimage_edit_link}
    Wait Until Page Contains Element    ${manage_profile_bannerimage_edit_link}
    sleep    2s
    Click Element    ${manage_profile_bannerimage_edit_link}
    Wait Until Page Contains Element     ${manage_profile_banner_add_image_link}
    ${banner_path}    Set Variable    ${CURDIR}${/}${manage_profile_business_logo2}
    Choose File    ${manage_profile_banner_input}    ${banner_path}
    Sleep    3s
    Wait Until Element Is Visible    ${manage_profile_edit_save_button2}
    Click Element    ${manage_profile_edit_save_button2}
    Sleep    2s

User edit what makes us different for ${profile}
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Scroll to Element to View    ${manage_profile_whatmakesusdiff_edit_link}
    Click Element    ${manage_profile_whatmakesusdiff_edit_link}
    ${manage_profile_existing_whatmakesusdiff}    Get Text    ${manage_profile_whatmakesusdiff_input}    ##Test what makes us diff of Yellow Premium+GLD profile for Test Online Customer2020 ##Test what makes us diff of Basic+BRNZ for Test Online Customer2020
    Set Global Variable    ${manage_profile_existing_whatmakesusdiff}
    Input Text    ${manage_profile_whatmakesusdiff_input}    test
    ${manage_profile_updated_whatmakesusdiff}    Get Text    ${manage_profile_whatmakesusdiff_input}
    Set Global Variable    ${manage_profile_updated_whatmakesusdiff}
    Run keyword if    "${profile}" == "premium"    Click Element And Wait For Another Element   ${manage_profile_edit_save_button}    ${manage_profile_removeyourlisting_title}
    ...    ELSE    Click Element    ${manage_profile_edit_save_button}
    sleep    2s

##---------------------------------------------------------------------------------------------------------
#Navigate to DLP
##---------------------------------------------------------------------------------------------------------
User navigates to DLP of the profile
    Scroll to Element to View    ${manage_profile_viewyourprofile_button}
    Click Element    ${manage_profile_viewyourprofile_button}
    Select Window  locator=NEW
    Reload Page
    sleep    4s
    Reload Page

##---------------------------------------------------------------------------------------------------------
#Updates reflect in DLP
##---------------------------------------------------------------------------------------------------------
User verifies the updated contact information for ${profile} profile is reflected in DLP
    User validates Business Logo
    User validates updated Trading Name
    Run Keyword If    "${profile}" == "premium"    User validates updated Legal Business Name
    User validates Physical address
    User validates physical location toggle
    User validates updated Service areas
    User validates updated Phone Numbers
    User validates updated Email address
    User validates updated Website URL

User validates Business Logo
    Page Should Contain Element    ${dlp_business_logo}

User validates updated Trading Name
    Verify page element:      ${dlp_Trading_name}
    ${dlp_tn} =    Get Text    ${dlp_Trading_name}
    Should Be Equal As Strings    ${dlp_tn}    ${manage_profile_updated_Trading_name}

User validates updated Legal Business Name
    Verify page element:      ${dlp_Legal_Tradingname}
    ${dlp_ltn} =    Get Text    ${dlp_Legal_Tradingname}
    Should Be Equal As Strings    ${dlp_ltn}    Also known as: ${manage_profile_updated_Legal_trading_name}

User validates Physical address
     Page Should Contain Element    ${dlp_street_address}
     ${dlp_phy_addr}    Get Text    ${dlp_street_address}
     Should be True    "${dlp_phy_addr}" == "69 Hall Avenue Mangere Auckland 2022"

User validates physical location toggle
    Page Should Contain Element    ${dlp_street_address}

User validates updated Service areas
    Verify page element:      ${dlp_servicing_area}
    ${dlp_sa} =    Get Text    ${dlp_servicing_area}
    ${expected_sa} =    Set Variable    Servicing: Whanganui Region, Canterbury Region, Bay Of Plenty, Timaru Oamaru Region, Marlborough Region, Northland, Nelson Region, Taranaki, Auckland Region, Waikato Region, Otago, Gisborne Region, Wellington Region, Wairarapa, Manawatu Region, Hawkes Bay, Southland Region, West Coast
    Should Be Equal As Strings    ${dlp_sa}    ${expected_sa}

User validates updated Phone Numbers
    Scroll to Element to View   ${dlp_phonenumber}
    CLick Element    ${dlp_phonenumber}
    Scroll to Element to View    ${dlp_phonenumber_primary}
    ${dlp_pn_primary} =    Get Text    ${dlp_phonenumber_primary}
    Should Be Equal As Strings    ${dlp_pn_primary}    022 ${manage_profile_updated_phonenumber}

User validates updated Email address
    Scroll to Element to View    ${dlp_email_address}
    Page should contain Element    ${dlp_emailaddress_value}

User validates updated Website URL
    Scroll to Element to View    ${dlp_website}
    ${dlp_website}    Get Element Attribute    ${dlp_websiteurl_value}    attribute=href
    Should Be Equal As Strings    ${dlp_website}    ${manage_profile_updated_websiteURL}/

User verifies the updated additional information for ${profile} profile is reflected in DLP
    Run Keyword If    "${profile}" == "premium"    User validates updated team members
    Run Keyword If    "${profile}" == "premium"    User validates updated Free-wifi
    User validates updated Parking
    User validates updated Year Etablished
    Run Keyword If    "${profile}" == "premium"    User validates updated Social Media Links

User validates updated team members
    Scroll to Element to View    ${dlp_additionalinfo_tab}
    Click Element    ${dlp_additionalinfo_tab}
    Scroll to Element to View    ${dlp_officemember_title}
    ${dlp_officemember_lastname}    Get Text    ${dlp_officemember1_value}
    Should Be Equal As Strings    ${dlp_officemember_lastname}    MR. TEST ${manage_profile_updated_teammember1_lastname} M.D.    ignore_case=True

User validates updated Free-wifi
    Scroll to Element to View    ${dlp_additionalinfo_tab}
    Click Element    ${dlp_additionalinfo_tab}
    Scroll to Element to View    ${dlp_WiFi_title}
    ${dlp_wifi_text}    Get Text    ${dlp_WiFi_Available}
    Should be True    "${dlp_wifi_text}" == "Available for customers"

User validates updated Parking
    Scroll to Element to View    ${dlp_additionalinfo_tab}
    Click Element    ${dlp_additionalinfo_tab}
    Scroll to Element to View    ${dlp_parkingoptions_title}
    ${dlp_parkingoption_text}    Get Text    ${dlp_parkingoption_value}
    Should be True    "${dlp_parkingoption_text}" == "Free Off-Street"

User validates updated Year Etablished
    Scroll to Element to View    ${dlp_additionalinfo_tab}
    Click Element    ${dlp_additionalinfo_tab}
    Scroll to Element to View    ${dlp_yearestablished}
    ${dlp_yearestablished_text}    Get Text    ${dlp_yearestablished_value}
    Should be True    "${dlp_yearestablished_text}" == "2020"

User validates updated Social Media Links
    Scroll to Element to View    ${dlp_additionalinfo_tab}
    Click Element    ${dlp_additionalinfo_tab}
    Scroll to Element to View    ${dlp_follow_us}
    ${dlp_followus_link}    Get Element Attribute    ${dlp_follow_us_value}    attribute=href
    Should Be Equal As Strings    ${dlp_followus_link}    ${manage_profile_updated_youtube_input}

User verifies the updated gallery section for premium profile
    User validates updated gallery image
    User validates updated gallery video

User validates updated gallery image
    Page Should Contain Element    ${dlp_gallery_image}

User validates updated gallery video
    Page Should Contain Element    ${dlp_gallery_video}

User verifies the updated manage categories section for ${profile} profile
    User validates updated business category

User validates updated business category
    Scroll to Element to View    ${dlp_listedin_title}
    ${dlp_category}    Get Text    ${dlp_listedin_value}
    Should Be Equal As Strings    ${dlp_category}    ${manage_profile_updated_category}

User verifies the updated main information section for ${profile} profile
    Click Element    ${dlp_main_tab}
    User validates updated business hours
    User validates updated keywords
    User validates updated business description
    Run Keyword If    "${profile}" == "premium"    User validates updated payment options
    Run Keyword If    "${profile}" == "premium"    User validates updated banner image
    Run Keyword If    "${profile}" == "premium"    User validates updated what makes us different

User validates updated business hours
    Scroll to Element to View    ${dlp_opening_hours_title}
    ${dlp_monday_times}    Get Text    ${dlp_openinghours_monday_value}
    Should Be Equal As Strings    ${dlp_monday_times}    Open ${manage_profile_updated_monday_businesshours}

User validates updated keywords
    Scroll to Element to View    ${dlp_productandservices_title}
    ${dlp_productservices_text}    Get Text    ${dlp_productandservices_value}
    should be true    "${dlp_productservices_text}" == "${keyword_firstoption_selected}"

User validates updated business description
    Scroll to Element to View    ${dlp_businessdesc_title}
    ${dlp_businessdesc_text}    Get Text    ${dlp_businessdesc_value}
    Should Be Equal As Strings    ${dlp_businessdesc_text}    ${manage_profile_updated_businessdescription}

User validates updated payment options
    Scroll to Element to View    ${dlp_additionalinfo_tab}
    Click Element    ${dlp_additionalinfo_tab}
    Scroll to Element to View    ${dlp_paymentoptions_title}
    Verify page element:    ${dlp_paymentoptions_DD}

User validates updated banner image
    Click Element    ${dlp_main_tab}
    Scroll to Element to View    ${dlp_whatmakesusdiff_title}
    Page Should Contain Element    ${dlp_banner_image}

User validates updated what makes us different
    Click Element    ${dlp_main_tab}
    Scroll to Element to View    ${dlp_whatmakesusdiff_title}
    ${dlp_whatmakesusdiff_text}    Get Text    ${dlp_whatmakesusdiff_text}
    Should Be Equal As Strings    ${dlp_whatmakesusdiff_text}    ${manage_profile_updated_whatmakesusdiff}

##---------------------------------------------------------------------------------------------
#manage profile field values setting back to original
##-----------------------------------------------------------------------------------------------
User set the existing values back for ${profile} profile
    Select Window  locator=MAIN
    Setting the logo back to original value
    Setting the trading name back to original value
    Setting the legal name back to original value
    Setting the physical address back to original value
    Setting the physical location toggle back to original value
    Setting the service area back to original value
    Setting the phone number back to original value
    Setting the email address back to original value
    Setting the website back to original value
    Setting the team member lastname back to original value
    Setting the free-wifi back to original value
    Setting the parking back to original value
    Setting the Year established back to original value
    Setting the Follow us back to original value
    Setting gallery back to original value
    Setting the category and boost back to original value
    Setting the business hours back to original value
    Setting the keywords back to original value
    Setting the business description back to original value
    Setting the payment options back to original value
    Setting the banner image back to original value
    Setting the what makes us diff back to original value

Setting the logo back to original value
    Wait Until Page Contains Element    ${manage_profile_business_logo_img}
    Click Element    ${manage_profile_business_logo_img}
    Wait Until Page Contains Element    ${manage_profile_business_logo_remove_button}
    Click Element    ${manage_profile_business_logo_remove_button}
    Click Element    ${manage_profile_edit_save_button}
    Sleep    2s

Setting the trading name back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Click Element    ${manage_profile_tradingname_edit_link}
    Click Element    ${manage_profile_tradingname_input}
    Input Text    ${manage_profile_tradingname_input}    ${manage_profile_existing_tradingname}
    Click Element    ${manage_profile_edit_save_button}

Setting the legal name back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Run Keyword If    "${profile}" == "premium"    Run Keywords    Click Element    ${manage_profile_legalbusinessname_edit_link}
    ...    AND    Click Element    ${manage_profile_legaltradingname_input}
    ...    AND    Input Text    ${manage_profile_legaltradingname_input}    ${manage_profile_existing_legalname}
    ...    AND    Click Element    ${manage_profile_edit_save_button}

Setting the physical address back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Click Element    ${manage_profile_physicallocation_edit_link}
    Click Element    ${manage_profile_search_new_address}
    Click Element    ${manage_profile_input_new_address}
    Sleep    1s
    Input Text    ${manage_profile_input_new_address}    ${manage_profile_existing_physical_address}    ##604 Great South Road, Ellerslie, 1051, Auckland, Auckland
    Click Element And Wait For Another Element    ${manage_profile_select_new_address}    ${manage_profile_physical_address_save}
    Click Element    ${manage_profile_physical_address_save}

Setting the physical location toggle back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Click Element    ${manage_profile_physicaladdress_show_radiobutton}  ##Setting to No

Setting the service area back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Wait until Element is Visible    ${manage_profile_serviceareas_edit_link}
    Click Element    ${manage_profile_serviceareas_edit_link}
    Click Element    ${manage_profile_servicearea_southisland_option}
    Sleep    1s
    Click Element    ${manage_profile_edit_save_button2}

Setting the phone number back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Wait until Element is Visible    ${manage_profile_phonenumber_edit_link}
    Click Element    ${manage_profile_phonenumber_edit_link}
    Click Element    ${manage_profile_phonenumber_number_input}
    Input Text    ${manage_profile_phonenumber_number_input}    ${manage_profile_existing_phonenumber}
    Click Element    ${manage_profile_edit_save_button2}

Setting the email address back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Wait until Element is Visible    ${manage_profile_emailaddress_edit_link}
    Click Element    ${manage_profile_emailaddress_edit_link}
    Click Element    ${manage_profile_emailaddress_input}
    Input Text    ${manage_profile_emailaddress_input}    ${manage_profile_existing_emailaddress}
    Click Element    ${manage_profile_edit_save_button}

Setting the website back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Wait until Element is Visible    ${manage_profile_websiteurl_edit_link}
    Click Element    ${manage_profile_websiteurl_edit_link}
    Click Element    ${manage_profile_websiteurl_input}
    Input Text    ${manage_profile_websiteurl_input}    ${manage_profile_existing_websiteURL}
    Click Element    ${manage_profile_edit_save_button}

Setting the team member lastname back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Run Keyword If    "${profile}" == "premium"    Run Keywords    Wait until Element is Visible    ${manage_profile_teammembers_edit_link}
    ...    AND    Click Element    ${manage_profile_teammembers_edit_link}
    ...    AND    Click Element    ${manage_profile_teammember1_edit_link}
    ...    AND    Click Element    ${manage_profile_teammember1_lastname_input}
    ...    AND    Input Text    ${manage_profile_teammember1_lastname_input}    ${manage_profile_existing_teammember1_lastname}
    ...    AND    Scroll to Element to View    ${manage_profile_edit_save_button}
    ...    AND    Click Element    ${manage_profile_edit_save_button}

Setting the free-wifi back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Run Keyword If    "${profile}" == "premium"    Click Element    ${manage_profile_freewifi_radio_button} ##set to No

Setting the parking back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Scroll to Element to View    ${manage_profile_parking_edit_link}
    Click Element    ${manage_profile_parking_edit_link}
    Click Element    ${manage_profile_parking_free_Offstreet_remove}
    Click Element    ${manage_profile_edit_save_button}

Setting the Year established back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Sleep    2s
    Click Element    ${manage_profile_yearestablished_edit_link}
    Click Element    ${manage_profile_yearestablished_input}
    Input Text    ${manage_profile_yearestablished_input}    ${manage_profile_existing_yearestablished}   ##1999
    Click Element    ${manage_profile_edit_save_button}

Setting the Follow us back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Run Keyword If    "${profile}" == "premium"    Run Keywords    Click Element    ${manage_profile_socialmedia_edit_link}
    ...    AND    Click Element    ${manage_profile_socialmedia_youtube_input}
    ...    AND    Input Text    ${manage_profile_socialmedia_youtube_input}    ${manage_profile_existing_youtube_input}
    ...    AND    Click Element    ${manage_profile_edit_save_button}

Setting gallery back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Scroll to Element to View    ${manage_profile_gallery_edit_link}
    Wait Until Element Is Visible    ${manage_profile_gallery_edit_link}
    sleep    2s
    Click Element    ${manage_profile_gallery_edit_link}
    Mouse Over    ${manage_profile_gallery_first_item_remove}
    Wait Until Element Is Visible    ${manage_profile_gallery_first_item_remove}
    Click Element    ${manage_profile_gallery_first_item_remove}
    Mouse Over    ${manage_profile_gallery_first_item_remove}
    Wait Until Element Is Visible    ${manage_profile_gallery_first_item_remove}
    Click Element    ${manage_profile_gallery_first_item_remove}
    Wait Until Element is Visible    ${manage_profile_edit_save_button2}
    Click Element    ${manage_profile_edit_save_button2}
    Sleep    2s

Setting the category and boost back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Click Element    ${manage_profile_categoryboost_edit_link}
    Click Element    ${manage_profile_categoryboost_dropdown}
    Run Keyword If    "${profile}" == "premium"    Click Element    ${manage_profile_category_plumbers_select}
    ...    ELSE    Click Element    ${manage_profile_category_plumbers_select}
    Click Element    ${manage_profile_edit_save_button}
    Click Element    ${manage_profile_categories_edit_link}
    Run Keyword If    "${profile}" == "premium"    Click Element    ${manage_profile_categoryboost_beautytherapy_remove}
    ...    ELSE    Click Element     ${manage_profile_categoryboost_plumbers_remove}
    Click Element    ${manage_profile_edit_save_button}


Setting the business hours back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Click Element    ${manage_profile_businesshours_edit_link}
    Click Element    ${manage_profile_maininfo_dropdown}
    Sleep    1s
    Click Element    ${manage_profile_businesshours_closed}
    Click Element    ${manage_profile_edit_save_button}

Setting the keywords back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Wait until element is visible    ${manage_profile_keywords_edit_link}
    Click Element    ${manage_profile_keywords_edit_link}
    Sleep    1s
    Wait until element is visible    ${manage_profile_maininfo_dropdown}
    Click Element    ${manage_profile_maininfo_dropdown}
    Click Element    ${manage_profile_keywords_dropdown_firstoption}
    Click Element    ${manage_profile_edit_save_button}

Setting the business description back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Wait until element is visible    ${manage_profile_businessdescription_edit_link}
    Click Element    ${manage_profile_businessdescription_edit_link}
    Input Text    ${manage_profile_businessdescription_input}    ${manage_profile_existing_businessdescription}
    Click Element    ${manage_profile_edit_save_button}

Setting the payment options back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Run Keyword If    "${profile}" == "premium"    Run Keywords    Wait until element is visible    ${manage_profile_paymentoption_edit_link}
    ...    AND    Click Element    ${manage_profile_paymentoption_edit_link}
    ...    AND    Sleep    1s
    ...    AND    Click Element    ${manage_profile_paymentoption_remove_secondoption}
    ...    AND    Click Element    ${manage_profile_edit_save_button}

Setting the banner image back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Scroll to Element to View    ${manage_profile_bannerimage_edit_link}
    Click Element    ${manage_profile_bannerimage_edit_link}
    Mouse Over    ${manage_profile_banner_img_remove}
    Wait Until Element Is Visible    ${manage_profile_banner_img_remove}
    Click Element    ${manage_profile_banner_img_remove}
    Wait Until Element Is Visible    ${manage_profile_edit_save_button2}
    Click Element    ${manage_profile_edit_save_button2}
    Sleep    3s

Setting the what makes us diff back to original value
    Wait until Page DoesNot Contain Element    ${manage_profile_saved_successfully_msg}
    Run Keyword If    "${profile}" == "premium"    Wait until element is visible    ${manage_profile_whatmakesusdiff_edit_link}
    Click Element    ${manage_profile_whatmakesusdiff_edit_link}
    Input Text    ${manage_profile_whatmakesusdiff_input}    ${manage_profile_existing_whatmakesusdiff}
    Click Element    ${manage_profile_edit_save_button}

##---------------------------------------------------------------------------------------------
#manage profile status setting back to original
##-----------------------------------------------------------------------------------------------
Setting the ${profile} profile status back to original
    Click Element    ${manage_profile_LHS}
    Wait until Element is Visible    ${manage_profile_business_logo_img}
    Setting the logo back to original value
    Run Keyword If    "${profile}" == "premium"    Setting gallery back to original value

##---------------------------------------------------------------------------------------------
#manage profile field - Remove your listing
##-----------------------------------------------------------------------------------------------
User scroll to see remove your listing option
    Scroll to Element to View    ${manage_profile_removeyourlisting_title}
    Wait Until Element Is Visible    ${manage_profile_removeyourlisting_submit_req_button}

User places the request to remove YOL profile with ${ranking} option
    Click Element    ${manage_profile_removeyourlisting_submit_req_button}
    Verify page element:    ${manage_profile_removeyourlisting_reason_placeholder}
    Click Element    ${manage_profile_removeyourlisting_reason_placeholder}
    Run Keyword If    "${ranking}" == "first"    Click Element    ${manage_profile_removeyourlisting_reason_firstoption}
    ...    ELSE IF     "${ranking}" == "second"    Click Element    ${manage_profile_removeyourlisting_reason_secondoption}
    ...    ELSE IF     "${ranking}" == "fourth"    Click Element    ${manage_profile_removeyourlisting_reason_fourthoption}
    ...    ELSE IF    "${ranking}" == "third"    Click Element    ${manage_profile_removeyourlisting_reason_thirdoption}
    Click Element    ${manage_profile_removeyourlisting_req_removal_button}
    Run Keyword if    "${ranking}" != "third"    Run Keywords    Wait Until Element Contains    ${manage_profile_removeyourlisting_submit_req_msg_holder}    A member of our team will be in touch to confirm your request.
    ...    AND    Click Element    ${manage_profile_removeyourlisting_submit_req_msg_close_button}