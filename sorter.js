const bayes = require('bayes');

const classifier = bayes();

// To watch teaching set
classifier.learn('wanna watch Deadpool movie', 'watch');
classifier.learn('new movie Avengers looks cool', 'watch');
classifier.learn('old show Game of Thrones have to see', 'watch');
classifier.learn('interesting film Citizen Kane', 'watch');
classifier.learn('nice show got to see Erased', 'watch');
classifier.learn('Spiderman release coming soon', 'watch');
classifier.learn('motion picture Studio Ghbili', 'watch');
classifier.learn('capivating scene in Gotham', 'watch');
classifier.learn('Pacific Rim has stunning visuals', 'watch');
classifier.learn('Top Gear is an illustrative show', 'watch');
classifier.learn('Lost has an engaging storyline', 'watch');
classifier.learn('want to see that new show 911', 'watch');
classifier.learn('big brother looks good', 'watch');
classifier.learn('hawaii five-0 is good show', 'watch');
classifier.learn('the crown nice tv show', 'watch');
classifier.learn('chick flick love actually', 'watch');
classifier.learn('amazing feature film Moonlight', 'watch');
classifier.learn('crazy cinematics in that movie Superman', 'watch');
classifier.learn('gotta watch in theatres Shaw Shank Redemption', 'watch');
classifier.learn('worth watching in the cinema Star Wars', 'watch');
classifier.learn('fantastic cinematography in Big Fat Greek Wedding', 'watch');
classifier.learn('must see flick King Arthur', 'watch');
classifier.learn('legit show Bobs Burgers', 'watch');
classifier.learn('great cartoon South Park', 'watch');
classifier.learn('nice toons Dragon Ball', 'watch');
classifier.learn('Shakespeake play midsummers nights dream', 'watch');
classifier.learn('gf will want to watch Apollo 13', 'watch');
classifier.learn('Roger will watch One Piece', 'watch');
classifier.learn('Sin must see Tresure Planet', 'watch');
classifier.learn('Halloween night watch The Exorcist', 'watch');
classifier.learn('sweet christmas movie the Santa Clause', 'watch');
classifier.learn('show to binge watch Greys Anatomy', 'watch');
classifier.learn('gotta see minions movie', 'watch');
classifier.learn('watch later the Purge', 'watch');
classifier.learn('great play with Robert DeNiro West Side story', 'watch');
classifier.learn('James Franco in 127 hours', 'watch');
classifier.learn('engaging show house', 'watch');
classifier.learn('smart show Death Note', 'watch');
classifier.learn('nice movie about magic Harry Potter', 'watch');
classifier.learn('the office to see on netflix', 'watch');
classifier.learn('great show at the rio theatre', 'watch');
classifier.learn('must see episode from anime series','watch');
classifier.learn('see the new anime show','watch');
classifier.learn('got to see retro documentary','watch');
classifier.learn('to see shooting columbine documentary','watch');
classifier.learn('will go see bobs burgers episode','watch');
classifier.learn('see with family the future film','watch');
classifier.learn('the office will see','watch');
classifier.learn('got to see the defenders','watch');
classifier.learn('gf will want to see vancouver fashion show','watch');
classifier.learn('video from youtube','watch');
classifier.learn('video from vimeo','watch');
classifier.learn('vlog from youtube','watch');
classifier.learn('youtube vloging','watch');
classifier.learn('vimeo video clip','watch');

// To eat teaching set
classifier.learn('good ramen at Jinya', 'eat');
classifier.learn('Congee Noodle house has yummy fried rice', 'eat');
classifier.learn('Spiciest food at noodle box', 'eat');
classifier.learn('Tuc is good for valentines dinner', 'eat');
classifier.learn('best hangout meal ever yolks', 'eat');
classifier.learn('got to try out cactus club cafe', 'eat');
classifier.learn('sophies cosmic cafe', 'eat');
classifier.learn('tell chris about boiled eggs from safeway', 'eat');
classifier.learn('freshest avocados at save on', 'eat');
classifier.learn('nesters got dope takeout', 'eat');
classifier.learn('nice eatery browns social house', 'eat');
classifier.learn('5 guys got good burgers', 'eat');
classifier.learn('freshii has healthier options', 'eat');
classifier.learn('mom will like this new dish', 'eat');
classifier.learn('for dad nice indian meal', 'eat');
classifier.learn('boyfriend will enjoy this place for dessert', 'eat');
classifier.learn('gotta take my girlfriend here for the macaroons', 'eat');
classifier.learn('Prado got damn smooth coffee', 'eat');
classifier.learn('coffeeshop heaven in revolver', 'eat');
classifier.learn('timbertrain got best coffee', 'eat');
classifier.learn('miku for authentic japanese cuisine', 'eat');
classifier.learn('try out to food at Donair','eat');
classifier.learn('matcha to try','eat');
classifier.learn('try the tea at davids tea','eat');
classifier.learn('try the kabobs from Kazba','eat');
classifier.learn('delicious lamb to try','eat');
classifier.learn('delicious vegan meal to try','eat');
classifier.learn('cheap eats to try at the warehouse','eat');
classifier.learn('Try the salad from nesters market','eat');
classifier.learn('Try out the clams from White Spot','eat');
classifier.learn('will try the food from Gojira ramen','eat');

// To read teaching set
classifier.learn('harpers bazaar fashion magazine', 'read');
classifier.learn('awesome Skier magazine', 'read');
classifier.learn('got to ', 'read');
classifier.learn('got to read novel to kill a mockingbird', 'read');
classifier.learn('must read Lord of the Rings', 'read');
classifier.learn('great Star Wars novel by some dude', 'read');
classifier.learn('interesting book by dali', 'read');
classifier.learn('tell alfred about downloading the artist ebook', 'read');
classifier.learn('chill reading Hillarys biography', 'read');
classifier.learn('autobiography of Picasso', 'read');
classifier.learn('for kindle: Illiad and the Oddessy', 'read');
classifier.learn('download into kindle Fire and Fury by Michael Wolff', 'read');
classifier.learn('Milk and Honey by Rupi Kaur', 'read');
classifier.learn('Nineteen Eighty Four by George Orwell', 'read');
classifier.learn('nice novel Hitchhikers guide to the Galaxy', 'read');
classifier.learn('must read 7 habits of highly effective people', 'read');
classifier.learn('read about investing in intelligent investor by ben graham', 'read');
classifier.learn('sexy magazine sports illustrated', 'read');
classifier.learn('maxim magazine', 'read');
classifier.learn('ebook Art of war by Sun Tzu', 'read');
classifier.learn('great photo magazine Zink', 'read');
classifier.learn('get tv guide book', 'read');
classifier.learn('Journal of sports science', 'read');
classifier.learn('bestseller book Art of the Deal', 'read');
classifier.learn('great text to read', 'read');
classifier.learn('read the writings of ghandhi', 'read');
classifier.learn('to read the Twilight series', 'read');
classifier.learn('interesting book abut magic Harry Potter', 'read');
classifier.learn('read the new journal article from psychology','read');
classifier.learn('article from flipboard must read','read');
classifier.learn('news article from the new york times must read','read');
classifier.learn('magazine column is a good read','read');
classifier.learn('a good tome to read on long journeys','read');
classifier.learn('i like this opinion piece love to read','read');
classifier.learn('read this book','read');
classifier.learn('read the revolver','read');
classifier.learn('read star wars','read');
classifier.learn('read Lord of the Rings','read');
classifier.learn('read the new book from stephen King','read');
classifier.learn('read IT from Stephen King','read');
classifier.learn('Read the shining by Stephen King','read');



// To buy teaching set
classifier.learn('gotta get this new device iPhone', 'buy');
classifier.learn('remember to buy on amazon Zagg screen protector', 'buy');
classifier.learn('get these flowers as birthday present for Steph', 'buy');
classifier.learn('buy this case for my computer', 'buy');
classifier.learn('to buy acer monitor', 'buy');
classifier.learn('must buy on amazon usb c cable', 'buy');
classifier.learn('ebay got good 2nd hand online store', 'buy');
classifier.learn('like to buy level ground coffee', 'buy');
classifier.learn('want to buy star wars toy', 'buy');
classifier.learn('to buy new macbook at best buy', 'buy');
classifier.learn('catan board game must get', 'buy');
classifier.learn('wish to buy bmw 335i', 'buy');
classifier.learn('buy new socks at the dollar store', 'buy');
classifier.learn('get new socks at the dollar store', 'buy');
classifier.learn('like to buy new camera bh photo video', 'buy');
classifier.learn('ltb sandisk memory card', 'buy');
classifier.learn('ltb panasonic gh5', 'buy');
classifier.learn('put nike shoes on ltb list', 'buy');
classifier.learn('get the new avengers dvd at shoppers drug mart', 'buy');
classifier.learn('gotta get computer case NZXT', 'buy');
classifier.learn('Artemesia is a good clothing store', 'buy');
classifier.learn('Secret location is a new clothing boutique store', 'buy');
classifier.learn('nice store Rodenstock', 'buy');
classifier.learn('great store Ted Baker', 'buy');
classifier.learn('buy games the the mall', 'buy');
classifier.learn('great jewellry at richmond centre', 'buy');
classifier.learn('oakridge mall has great selection', 'buy');
classifier.learn('pacific centre great place to buy luxury things', 'buy');
classifier.learn('metrotown centre mall lots of stores', 'buy');
classifier.learn('get leather gloves at the bay department store', 'buy');
classifier.learn('aberdeen centre got great asian stuff', 'buy');
classifier.learn('designer outlet mall near the airport', 'buy');
classifier.learn('Purchase hoodies at hoodie store', 'buy');
classifier.learn('great purchase from the umbrella store', 'buy');
classifier.learn('nice products, good purchase', 'buy');
classifier.learn('gonna buy House from the store', 'buy');
classifier.learn('purchasing headphones from AV boutique', 'buy');
classifier.learn('awesome purchase at tinseltown mall', 'buy');
classifier.learn('purchase pill from body energy club', 'buy');








// my test
// console.log('should be -watch:', classifier.categorize('see the new star wars movie'));
// console.log('should be -watch:', classifier.categorize('great show at the rio theatre'));
// console.log('should be -watch:', classifier.categorize('the office to see on netflix'));
// console.log('should be -watch:', classifier.categorize('breaking bad good show'));

// Test Watch
console.log('should be -watch:', classifier.categorize('See an episode 93 of the Office'));
console.log('should be -watch:', classifier.categorize('See documentary on neurochemical inhibitors'));
console.log('should be -watch:', classifier.categorize('Watch Youtube video "Most effective shuffling method"'));
console.log('should be -watch:', classifier.categorize('The Shining'));

// Test Eat
console.log('should be -eat:', classifier.categorize('Try out the Donair'));
console.log('should be -eat:', classifier.categorize('Try the chicken at Nesters Market'));
console.log('should be -eat:', classifier.categorize('Eat out at the Keg'));
console.log('should be -eat:', classifier.categorize('Try the new frappuccino at the Big M'));

// Test Read
console.log('should be -read:', classifier.categorize('Read Paradise Lost'));
console.log('should be -read:', classifier.categorize('Read the Meditations'));
console.log('should be -read:', classifier.categorize('Read Emotional Intelligence'));
console.log('should be -read:', classifier.categorize('Raed Fahrenheit 451'));

// Test buy
console.log('should be -buy:', classifier.categorize('Buy HDMI cable'));
console.log('should be -buy:', classifier.categorize('Get a bouquet'));
console.log('should be -buy:', classifier.categorize('Get new umbrella'));
console.log('should be -buy:', classifier.categorize('Purchase down syndrome'));
