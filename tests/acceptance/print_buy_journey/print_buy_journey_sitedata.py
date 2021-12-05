#===============================================================================================================================================#
# Yellow Page
#===============================================================================================================================================#
print_profile_link                     = "/our-products/yellow-pages/"
print_page_heading                     ="//span/strong[contains(text(),'Yellow Pages')]"
print_onboarding_url                   ="/our-products/product-brief/print"
print_get_started                      = "//a[contains(text(),'Get Started')]"

#===============================================================================================================================================#
# Print- Brief
#===============================================================================================================================================#
print_brief_bus_name_title             = "//label[contains(text(),'Business Name')]"
print_brief_bus_name_input             = "//input[@id='Business Name']"
print_brief_bus_name                   = "Test Company-Print-Buy01"
print_brief_addr_input                 = "//input[@id='GooglePlacesAutocomplete']"
print_brief_street_num                 = "//input[@id='streetNumber']"
print_brief_search_new_addr_link       = "//button[contains(text(),'Search new address')]"
print_brief_primary_ph_num_title       = "//label[contains(text(),'Primary Phone Number')]"
print_brief_primary_ph_area_code       = "//select[@id='areaCode'][1]"
print_brief_primary_area_code_021      = "(//select[@id='areaCode'])[1]/option[contains(text(),'021')]"
print_brief_primary_ph_number_input    = "(//input[@id='number'])[1]"
print_brief_secondary_ph_num_title     = "//label[contains(text(),'Additional Phone Number')]"
print_brief_secondary_ph_area_code     = "(//select[@id='areaCode'])[2]"
print_brief_secondary_area_code_022    = "(//select[@id='areaCode'])[2]/option[contains(text(),'022')]"
print_brief_secondary_ph_number_input  = "(//input[@id='number'])[2]"
print_brief_email_title                = "//label[contains(text(),'Email')]"
print_brief_email_input                = "//input[@id='Email']"
print_brief_website_title              = "//label[contains(text(),'Website')]"
print_brief_website_input              = "//input[@id='website']"
print_brief_yellow_page_book_title     = "//h2[contains(text(),'Select your Yellow Pages Book')]"
print_brief_yellow_book_select         = "//input[@aria-label='Yellow Pages book select']"
print_brief_selected_book_holder       = "//*[@id='Choose Yellow Pages book']/div/div[1]/div[1]"
print_brief_bus_category_title         = "//h2[contains(text(),'Select your main business category')]"
print_brief_category_input             = "//input[@aria-label='Yellow Pages main category select']"
print_brief_book_design_title          = "//h2[contains(text(),'Available listing designs')]"
print_brief_design_input               = "//input[@aria-label='Yellow Pages listing type']"
print_brief_design_value_holder        = "//*[@id='Available listing designs']/div/div[1]/div[1]"
print_brief_next_button                = "xpath=//button[contains(text(),'Next')]"
print_proceedtopayment_button          = "//button[contains(text(),'Proceed to Payment')]"

#===============================================================================================================================================#
# Print- Checkout Page
#===============================================================================================================================================#
print_checkout_product_line            = "//section/div/section/div/table/tbody/tr[1]/td[2]/h5"
expected_print_product_line            = "Print Listing - Marlborough"
subtotal_holder                        = "//section/div/section/div/table/tbody/tr[3]/td[3]"
my_products_whole_div                  = "//*[@id='gatsby-focus-wrapper']/div[4]/div[2]"