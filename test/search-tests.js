var assert = require('assert');

const string_has_substring = (initText, content) => {
    if(initText.includes(content))
        return true;
    else
        return false;
}

const display_header = () => {
    console.log('');
    console.log('-------------------------------------------------------------');
    console.log('TEST:');
    console.log('');
}

describe('Search Functionality', function() {

    it('should open search results page', () => {
        browser
            .url('/')
            .setValue('#tab_cat_id_field', '')
            .click('#form-submit');
        var url = browser.getUrl();
        var url_is_expected = string_has_substring(url,'/to-rent/property/uae/');

        display_header();
        console.log('\"Opens search results page\"');
        console.log('');
        console.log('Url is: ' + url);
        console.log('');
        assert.strictEqual(url_is_expected, true);
    });

    it('should return a list of properties', () => {
        browser
            .url('/')
            .setValue('#tab_cat_id_field', '')
            .click('#form-submit');

        var list_content = browser.getHTML('ul',false);
        const exists_list = () => {
            if(list_content!=="")
                return true;
            else
                return false;
        };

        display_header();
        console.log('\"Returns a list of properties\"');
        console.log('');
        assert.strictEqual(exists_list(), true);
    })

//    it('should return no properties (for: Damac Heights)', () => {
//        browser
//            .url('/')
//            .setValue('#tab_cat_id_field', 'Damac Heights')
//            .click('#form-submit');
//
//        var list_content = browser.element('.no-listing-msg');
//        const exists_list = () => {
//            if(list_content!==null)
//                return true;
//            else
//                return false;
//        };
//        display_header();
//        console.log('Returns no properties for `Damac Heights`');
//        console.log('');
//        assert.strictEqual(exists_list(), false);
//    })

    it('should open Dubai Marina results page, on search', () => {
        browser
            .url('/')
            .setValue('#tab_cat_id_field', 'Dubai Marina');
        browser.pause('2000');
        browser.keys('Enter');
        browser.click('#form-submit');
        var url = browser.getUrl();
        var url_is_expected = string_has_substring(url,'/dubai/dubai-marina/');

        display_header();
        console.log('\"Opens `Dubai Marina` results page\"');
        console.log('');
        console.log('Url is: ' + url);
        console.log('');
        assert.strictEqual(url_is_expected, true);
    });

    it('should check if first property has the searched location (Dubai Marina)', ()=>{
        browser
            .url('/')
            .setValue('#tab_cat_id_field', 'Dubai Marina');
        browser.pause('2000');
        browser.keys('Enter');
        browser.click('#form-submit');
        var loc_el = browser.element('#search_listing_section li:nth-child(1) a .right .location');
        var loc_id = loc_el.value.ELEMENT;
        var loc_text = browser.elementIdText(loc_id).value;
        var result_has_location = string_has_substring(loc_text,'Dubai Marina');

        display_header();
        console.log('\"Result has searched location `Dubai Marina`\"');
        console.log('');
        console.log('Result location: '+loc_text);
        console.log('');
        assert.strictEqual(result_has_location, true);
    });

    it('should check if each property has the searched-for location (Dubai Marina)', () => {
        browser
            .url('/')
            .setValue('#tab_cat_id_field', 'Dubai Marina');
        browser.pause('2000');
        browser.keys('Enter');
        browser.click('#form-submit');
        var loc_elems = browser.elements('#search_listing_section li a .right .location');
        loc_elems = loc_elems.value;
        var locations = [];
        var all_have_loc = true;

        const get_ids = () => {
            for(var i=0; i< loc_elems.length; i++){
                var loc_id = loc_elems[i].ELEMENT;
                var loc_text = browser.elementIdText(loc_id).value;
                locations.push(loc_text);
            }
        }
        const check_display_locations = () => {
            for(var i=0; i< locations.length; i++){
                var result_has_location = string_has_substring(locations[i],'Dubai Marina');
                if(!result_has_location) all_have_loc = false;
            }
        }
        get_ids();

        display_header();
        console.log('\"All results have location `Dubai Marina` \"');
        console.log('');
        console.log('Locations: ');
        console.log(locations);
        console.log('');
        console.log('Results have searched-for location:');
        check_display_locations();
        assert.strictEqual(all_have_loc, true);
    });

    it('should open apartments results page when search for apartments', () => {
        browser
            .url('/')
            .setValue('#tab_cat_id_field', 'Downtown Dubai')
            .pause('2000');
        browser
            .keys('Enter')
            .pause('2000');
        browser.setValue('#for-sale-extra .prop_Type .custom-combobox input', 'Apartments');
        browser.click('#form-submit');
        var url = browser.getUrl();
        var url_is_expected = string_has_substring(url,'/apartments/');

        display_header();
        console.log('\"Opens apartments result page\"');
        console.log('');
        console.log('Url is: ' + url);
        console.log('');
        assert.strictEqual(url_is_expected, true);
    });

    it('should return apartments list when search for apartments', () => {
        browser
            .url('/')
            .setValue('#tab_cat_id_field', 'Downtown Dubai')
            .pause('2000');
        browser
            .keys('Enter')
            .pause('2000');
        browser.setValue('#for-sale-extra .prop_Type .custom-combobox input', 'Apartments');
        browser.click('#form-submit');
        var aps = browser.elements('#search_listing_section .ls-mn .block .slider_content .slider_pinfo li:nth-child(1)');
        aps = aps.value;
        var apartments = [];
        var all_have_aps = true;

        const get_aps = () => {
            for(var i=0; i< aps.length; i++){
                var ap_id = aps[i].ELEMENT;
                var ap_text = browser.elementIdText(ap_id).value;
                apartments.push(ap_text);
            }
        }
        const check_display_aps = () => {
            for(var i=0; i< aps.length; i++){
                var result_has_ap = string_has_substring(apartments[i],'Apartment');
                if(!result_has_ap) {
                    all_have_aps = false;
                }
            }
        }

        get_aps();
        display_header();
        check_display_aps();
        console.log('\"Results are apartments\"');
        console.log('');
        console.log('Apartments:');
        console.log(apartments);
        console.log('');
        assert.strictEqual(all_have_aps, true);
    });

    it('should return apartments with 5 beds', () => {
        browser
            .url('/')
            .setValue('#tab_cat_id_field', 'Dubai Marina')
            .pause('1200');
        browser
            .keys('Enter')
            .pause('1200');
        browser.setValue('#for-sale-extra .prop_Type .custom-combobox input', 'Apartments');
        browser.click('#beds');
        browser.pause('1200');
        browser.click('#beds_5');
        browser.pause('1200');
        browser.click('#form-submit');
        var aps = browser.elements('#search_listing_section .ls-mn .block .slider_content .slider_pinfo li:nth-child(1)');
        aps = aps.value;
        var apartments = [];
        var all_have_beds = true;

        const get_aps = () => {
            for(var i=0; i< aps.length; i++){
                var ap_id = aps[i].ELEMENT;
                var ap_text = browser.elementIdText(ap_id).value;
                apartments.push(ap_text);
            }
        }
        const check_display_beds = () => {
            for(var i=0; i< aps.length; i++){
                var result_has_beds = string_has_substring(apartments[i],'5 Bed');
                if(!result_has_beds){
                    all_have_beds = false;
                }
            }
        }

        get_aps();
        display_header();
        console.log('\"Results have apartments with 5 beds\"');
        console.log('');
        check_display_beds();
        console.log(apartments);
        assert.strictEqual(all_have_beds, true);
    });

})



