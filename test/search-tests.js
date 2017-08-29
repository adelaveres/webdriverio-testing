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
        console.log('Url is: ' + url);
        console.log('Url is as expected: ' + url_is_expected);
        console.log('');
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
        console.log('Has list of properties: ' + exists_list());
    })

    it('should return no properties (for: Damac Heights)', () => {
        browser
            .url('/')
            .setValue('#tab_cat_id_field', 'Damac Heights')
            .click('#form-submit');

        var list_content = browser.element('.no-listing-msg');
        const exists_list = () => {
            if(list_content===null)
                return false;
            else
                return true;
        };
        display_header();
        console.log('No properties: ' + exists_list());
    })

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
        console.log('Url is: ' + url);
        console.log('Url is as expected: ' + url_is_expected);
        console.log('');
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
        console.log('Result has searched location (Dubai Marina): '+ result_has_location);
        console.log('Result location: '+loc_text);
        console.log('');
    });

    it('should check if each result has the searched-for location', () => {
        browser
            .url('/')
            .setValue('#tab_cat_id_field', 'Dubai Marina');
        browser.pause('2000');
        browser.keys('Enter');
        browser.click('#form-submit');
        var loc_elems = browser.elements('#search_listing_section li a .right .location');
        var loc_ids = [];

        display_header();
        const get_ids = () => {
            for(var i=0; i< loc_elems.length; i++){
                loc_ids.push(loc_elems[i].value.ELEMENT);
                console.log(loc_ids[i]);
            }
        }
        
//        console.log(loc_ids);
    });

})



