const cheerio = require("cheerio")

function getData(body) {
  var $ = cheerio.load(body)
  
  var scripts = $("script[type='text/javascript']")
  var sharedData = JSON.parse(
    scripts[3].children[0].data
    .replace("window._sharedData = ", "")
    .replace("};", "}")
    )
    
  var graphql = sharedData.entry_data.ProfilePage[0].graphql.user
    
  return {
    "userId": graphql.id,
    "username": graphql.username,
    "isPrivate": graphql.is_private,
    "isBusinessAccount": graphql.is_business_account,
    "externalUrl": graphql.external_url,
    "fullName": graphql.full_name,
    "email": graphql.business_email,
    "phone": graphql.business_phone_number,
    "followers": graphql.edge_followed_by.count,
    "following": graphql.edge_follow.count,
    "posts": graphql.edge_owner_to_timeline_media.count,
    "country": graphql.business_address_json ? graphql.business_address_json.country_code : null,
    "city": graphql.business_address_json ? graphql.business_address_json.city_name : null,
    "businessCategory": graphql.business_category_name,
    "biography": graphql.biography,
    "pictureUrl": graphql.profile_pic_url,
    "pictureHDUrl": graphql.profile_pic_url_hd,
    "isVerified": graphql.is_verified,
    "data": graphql,
  }
}

module.exports = { getData }