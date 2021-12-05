#-----------------------------------------------------------------------------------------------------------------------
# Yellow profile
#-----------------------------------------------------------------------------------------------------------------------
yellow_profile_link                                   = "/our-products/yellow-profile/"
yellow_online_profile                                 = "xpath=//*[@id='gatsby-focus-wrapper']/div[2]/div[3]/ul[1]/li[2]/a"
choose_yellow_profile                                 = "xpath=//*[@id='yellow-profile-hero']/div[1]/div[2]/a"
select_base_profile                                   = "xpath=//button[contains(text(),'Select Profile')]"
#select_paid_profile                                   = "xpath=//*[@id='yellow-choose-your-profile-promotion']/div[2]/div[2]/div[2]/button"
select_paid_profile                                   = "xpath=//div[2]/button[contains(text(), 'Select Profile')]"
purchase_button                                       = "xpath=//button[contains(text(),'Purchase')]"
#category_sponsership_gold                             = "xpath=//*[@id='yellow-choose-your-profile-promotion']/div[2]/div[2]/div[3]/div[1]/img[1]"
category_sponsership_gold                             = "xpath=//div[2][contains(@role,'listbox')]/img[contains(@src,'iVBOR')]"
#category_sponsehip_silver                             = "xpath=//*[@id='yellow-choose-your-profile-promotion']/div[2]/div[2]/div[3]/div[2]/img[1]"
category_sponsorship_silver                           = "xpath=//div[3][contains(@role,'listbox')]/img[contains(@src,'iVBOR')]"
#category_sponsehip_bronze                             = "xpath=//*[@id='yellow-choose-your-profile-promotion']/div[2]/div[2]/div[3]/div[3]/img[1]"
category_sponsership_bronze                           = "xpath=//div[4][contains(@role,'listbox')]/img[contains(@src,'iVBOR')]"
our_products_yellow_online_profile_link               = "xpath=//*[@id='gatsby-focus-wrapper']/section/ul/li[4]/div[1]/img"

#-----------------------------------------------------------------------------------------------------------------------
# Checkout page-company details
#-----------------------------------------------------------------------------------------------------------------------
checkout_page_header                                  = "xpath=//*[@id='gatsby-focus-wrapper']/section/h1"
company_name                                          = "xpath=//*[@id='companyName']"
Area_code                                             = "xpath=//*[@id='areaCode']"
Phone_number                                          = "xpath=//*[@id='number']"
Search_for_your_address                               = "xpath=//*[@id='GooglePlacesAutocomplete']"

#-----------------------------------------------------------------------------------------------------------------------
# Checkout page-Credit card
#-----------------------------------------------------------------------------------------------------------------------
payment_detail_frame_area                             = "xpath=//*[starts-with(@name, '__privateStripeFrame')][contains(@title,'Secure card number input frame')]"
payment_expiry_date_frame                             = "xpath=//*[starts-with(@name, '__privateStripeFrame')][contains(@title,'Secure expiration date input frame')]"
payment_cvc_frame                                     = "xpath=//*[starts-with(@name, '__privateStripeFrame')][contains(@title,'Secure CVC input frame')]"
card_number                                           = "xpath=//input[@name='cardnumber']"
expiry_date                                           = "xpath=//input[@name='exp-date']"
cvc_number                                            = "xpath=//input[@name='cvc']"
payment_details_zip                                   = "xpath=//input[@name='postal']"
cardholder_name                                       = "xpath=//*[@id='cardholder-name']"
order_terms_of_business_checkbox                      = "xpath=//*[contains(@alt,'check-box-terms')]"
order_payments_checkbox                               = "xpath=//*[contains(@alt,'check-box-authorize')]"
submit_order_button                                   = "xpath=//a[contains(text(),'Submit')]"
order_confirmation                                    = "xpath=//h2[contains(text(),'Your order has been placed')]"
set_up_my_products_button                             = "xpath=//a[contains(text(),'Set up your products')]"
cart_summary_title_label                              = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/section/header/h3"
company_details_title_label                           = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/div/div[1]/section/h3"
coupon_details_title_label                            = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/div/div[2]/section[1]/h3"
payment_details_title_label                           = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/div/div[3]/section[1]/h3"
continue_button                                       = "xpath=//button[contains(text(),'CONTINUE')]"

#-----------------------------------------------------------------------------------------------------------------------
#exsiting profile details for logged in users
#-----------------------------------------------------------------------------------------------------------------------
proceed_with_purchase                                = "xpath=//button[contains(text(),'PROCEED WITH PURCHASE')]"
auto_populated_business_name                          = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/div/div[1]/section/form/div[1]/div[1]/p"
#-----------------------------------------------------------------------------------------------------------------------
#Hubspot
#-----------------------------------------------------------------------------------------------------------------------
Hubspot_sign_up                                       = "HubSpot Login"
hubspot_username_textfield                            = "xpath=//*[@id='username']"
hubspot_password_textfield                            = "xpath=//*[@id='password']"
hubspot_login_button                                  = "xpath=//*[@id='loginBtn']"
hubspot_username                                      = "ytechqa.testaccount@yellow.co.nz"
hubspot_password                                      = "Darkhorn50!"
hubspot_contacts_link                                 = "https://app.hubspot.com/contacts/5892170/contacts/"
unregistered_email                                    = "cs8neo9n@gmail.com"
hubspot_contact_link                                  = "xpath=//div[@tabindex='0']/a[@type='button']"
hubspot_search_contact                                = "xpath=//input[@type='search']"
hubspot_company                                       = "xpath=//i18n-string[@data-key='customerDataSidebar.COMPANIES.title']"
hubspot_company_name                                  = "xpath=//div[@class='private-flex p-top-2 UIFlex__StyledFlex-sc-19uxptt-0 hYTFMe']//a[contains(@href,'/company/')]"
hubspot_company_domain                                = "xpath=//span[@class='private-truncated-string__inner']/span"
hubspot_deal                                          = "xpath=//a[@type='button' and contains(@href,'/deal/')]"
hubspot_deal_captured                                 = "xpath=//span[contains(@class,'DealTicketEditableTitle')]"

#-----------------------------------------------------------------------------------------------------------------------
#Stripe
#-----------------------------------------------------------------------------------------------------------------------
stripe_username                                       = "css=input#email"
stripe_password                                       = "css=input#password"
stripe_signin                                         = "css=p.submit Button"
stripe_home_page_top_search_input                     = "css=input.db-SuggestionInput-input"
ascii_enter_key                                       = "\\13"
stripe_customer_page_section_name                     = "css=div.db-CustomerTimeline-header"

#-----------------------------------------------------------------------------------------------------------------------
#Order Confirmation Page
#-----------------------------------------------------------------------------------------------------------------------
confirmation_page_order_conformation_id_label         = "xpath=//*[@id='gatsby-focus-wrapper']/section/section/div[2]/div[1]/p"
#-----------------------------------------------------------------------------------------------------------------------
#Gmail
#-----------------------------------------------------------------------------------------------------------------------
gmail_promotion_tab                                   = "xpath=//*[@id=':2c']"
gmail_automation_1st_order_confirmaiton_email         = "xpath=//span[starts-with(@id,':') and @class='bog']"

#-----------------------------------------------------------------------------------------------------------------------
# Cart Summary
#-----------------------------------------------------------------------------------------------------------------------
#first_period_billed_base_profile                      = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/section/div/table/tbody/tr[2]/td[4]/span"
first_period_billed_base_profile                      = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/section/div/table/tbody/tr[4]/td[4]"
first_period_billed_subtotal                          = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/section/div/table/tbody/tr[3]/td[4]"
first_period_total                                    = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/section/div/table/tfoot[2]/tr[1]/td[4]"
first_period_first_category_boost                     = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/section/div/table/tbody/tr[3]/td[4]/span"
first_category_profile_subtotal                       = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/section/div/table/tbody/tr[5]/td[4]"
first_category_profile_gst                            = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/section/div/table/tbody/tr[4]/td[4]"
first_period_billed_header                            = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/section/div/table/tbody/tr[2]/td[4]/div/strong"
first_period_second_category_boost                    = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/section/div/table/tbody/tr[5]/td[4]/span"
first_period_two_category_boost_subtotal              = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/section/div/table/tbody/tr[7]/td[4]"
first_period_two_categories_boost_gst                 = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/section/div/table/tbody/tr[8]/td[4]"
Total_for_Monthly_ongoing                             = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/section/div/table/tfoot[2]/tr[1]/td[3]"
monthly_ongoing_subtotal                              = "//*[@id='gatsby-focus-wrapper']/section/div/section/div/table/tbody/tr[5]/td[3]"
first_period_billed_header_category                   = "xpath=//*[@id='gatsby-focus-wrapper']/section/div/section/div/table/tbody/tr[3]/td[4]/div/strong"