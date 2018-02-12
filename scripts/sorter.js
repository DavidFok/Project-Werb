const path = require('path');
const awsPath = path.resolve('./scripts/awscreds.json');

const bayes = require('bayes');
const classifier = bayes();

var AWS = require('aws-sdk');
var uuid = require('node-uuid');

AWS.config.correctClockSkew = true;
AWS.config.loadFromPath(awsPath);

AWS.config.apiVersions = { comprehend: '2017-11-27' };

const comprehend = new AWS.Comprehend();

// watch
// Keywords - watch, see, movie, film, tv, show, video, documentary
// phrase examples:   wanna watch Deadpool movie
//                    watch chick flick movie love actually
//                    gotta watch Shaw Shank Redemption
//                    youtube South Park video
//                    TV Show sbout doctors House
//                    gotta see minions movie


// To watch teaching set
classifier.learn('wanna watch Deadpool movie', 'watch');
classifier.learn('new movie Avengers sci fi', 'watch');
classifier.learn('tv show Game of Thrones', 'watch');
classifier.learn('watch old film Citizen Kane', 'watch');
classifier.learn('Spiderman movie watch', 'watch');
classifier.learn('watch movies from Studio Ghbili', 'watch');
classifier.learn('hot tv show Gotham', 'watch');
classifier.learn('Top Gear tv show about cars', 'watch');
classifier.learn('watch tv show Lost', 'watch');
classifier.learn('find youtube video from Stephen Colbert', 'watch');
classifier.learn('Nice tv show The Crown', 'watch');
classifier.learn('watch chick flick movie Love Actually', 'watch');
classifier.learn('watch the film Shaw Shank Redemption', 'watch');
classifier.learn('go see film Star Wars', 'watch');
classifier.learn("funny show Bob's Burgers", 'watch');
classifier.learn('youtube South Park video', 'watch');
classifier.learn('gf will want to watch Apollo 13 movie', 'watch');
classifier.learn('tv show to binge watch Greys Anatomy', 'watch');
classifier.learn('gotta see minions movie', 'watch');
classifier.learn('watch the Purge', 'watch');
classifier.learn('TV Show sbout doctors House', 'watch');
classifier.learn('watch The Office on youtube', 'watch');
classifier.learn('to see Bowling for Columbine documentary','watch');
classifier.learn('watch youtube video chicken attack','watch');
classifier.learn('see the documentary Man on Wire','watch');
classifier.learn('youtube pewdiepie','watch');
classifier.learn('philip defranco youtuber','watch');

// Eat
// Keywords - eat, yummy, restaurant, food, dinner, lunch, cafe
// phrase examples:   Freshii has healthy lunches
//                    Eat dinner at Kazba
//                    good restaurant Trattoria


// To eat teaching set
classifier.learn('yummy ramen restaurant Jinya', 'eat');
classifier.learn('eat the fried rice from Congee Noodle house', 'eat');
classifier.learn('can eat Spicy food at Noodle Box', 'eat');
classifier.learn('Tuc is good restaurant valentines dinner', 'eat');
classifier.learn('got to try out cactus club cafe', 'eat');
classifier.learn('breakfast at Sophies Cosmic Cafe', 'eat');
classifier.learn('good burgers at 5 Guys restaurant', 'eat');
classifier.learn('Freshii has healthy lunches', 'eat');
classifier.learn('Prado is a good cafe', 'eat');
classifier.learn('try Revolver Cafe', 'eat');
classifier.learn('Miku for authentic japanese food', 'eat');
classifier.learn('Eat dinner at Kazba','eat');
classifier.learn('good restaurant Trattoria','eat');
classifier.learn('cheap eats at The Warehouse','eat');
classifier.learn('catems donuts very yummy','eat');
classifier.learn('eat northern chinese food at Peaceful Restaurant','eat');
classifier.learn('Try the food from Gojira ramen','eat');
classifier.learn('yummy eats at Phnom Phenn','eat');

// Read
// Keywords - read, book, magazine, article, novel, journal, writing, author
// phrase examples:   Read the Twilight series
//                    Read novel to Kill a Mockingbird
//                    book Fire and Fury by Michael Wolff
//                    Maxim magazine

// To read teaching set
classifier.learn('harpers bazaar fashion magazine', 'read');
classifier.learn('Awesome Skier magazine', 'read');
classifier.learn('Read novel to Kill a Mockingbird', 'read');
classifier.learn('Read the books the Lord of the Rings', 'read');
classifier.learn('great Star Wars novel by Timothy Zahn', 'read');
classifier.learn('read interesting article by Christiane Amanpour', 'read');
classifier.learn('nice book Illiad and the Oddessy', 'read');
classifier.learn('book Fire and Fury by Michael Wolff', 'read');
classifier.learn('novel Nineteen Eighty Four by George Orwell', 'read');
classifier.learn('read book Hitchhikers guide to the Galaxy', 'read');
classifier.learn('must read 7 habits of highly effective people', 'read');
classifier.learn('read about investing in Intelligent Investor by ben graham', 'read');
classifier.learn('Maxim magazine', 'read');
classifier.learn('Art of war by Sun Tzu good book', 'read');
classifier.learn('great photo magazine Zink', 'read');
classifier.learn('Journal of Sports Science and Medicine', 'read');
classifier.learn('read the writings of Ghandhi', 'read');
classifier.learn('Read the Twilight series', 'read');
classifier.learn('nice novels Harry Potter', 'read');
classifier.learn('news article from the new york times must read','read');
classifier.learn('Read the Shining by Stephen King','read');
classifier.learn('Raed the Paradise series','read');
classifier.learn('read the series of books from JK Rowling','read');
classifier.learn('the author John Green','read');
classifier.learn('Read books from author Mark Twain','read');
classifier.learn('read articles from Huffington Post','read');

// Buy
// Keywords - buy, get, purchase, wtb, store, centre, amazon
// phrase examples:   Rodenstock good clothing boutique store
//                    buy on amazon Zagg screen protector
//                    wtb Panasonic GH5
//                    Aberdeen Centre has good asian stuff

// To buy teaching set
classifier.learn('gotta get this new iPhone', 'buy');
classifier.learn('buy on amazon Zagg screen protector', 'buy');
classifier.learn('buy Incase cases at London Drugs store', 'buy');
classifier.learn('purchase Acer monitors', 'buy');
classifier.learn('purchase usb c cables on amazon', 'buy');
classifier.learn('get umbrellas from The Umbrella Store', 'buy');
classifier.learn('buy Supreme hoodie from Coquitlam mall', 'buy');
classifier.learn('buy catan board game at Tinseltown mall', 'buy');
classifier.learn('get cat socks at the dollarama store', 'buy');
classifier.learn('wtb sandisk memory cards', 'buy');
classifier.learn('wtb Panasonic GH5', 'buy');
classifier.learn('get the new avengers dvd on Amazon', 'buy');
classifier.learn('Artemesia is a good clothing store', 'buy');
classifier.learn('Rodenstock good clothing boutique store', 'buy');
classifier.learn('great jewellry at richmond centre', 'buy');
classifier.learn('Oakridge Mall', 'buy');
classifier.learn('Pacific Centre great to buy Bose speakers', 'buy');
classifier.learn('Aberdeen Centre has good asian stuff', 'buy');




function sorter (input) {
  return classifier.categorize(input);
}


function extractEntities (inputText) {
  let params = {
    LanguageCode: 'en',
    Text: inputText
  };
  return new Promise(function(resolve, reject) {
    comprehend.detectEntities(params, function(err, data) {
      if (err) { console.log(err, err.stack) }
      else {
        console.log("the data is: ", data);
        resolve(data);
      }
    });
  });
}


module.exports = {
  entry: sorter,
  entity: extractEntities
};
// watch keywords - watch, see, movie, film, tv, show, video, documentary

// Eat keywords - eat, yummy, restaurant, food, dinner, lunch, cafe

// Read keywords - read, book, magazine, article, novel, journal, writing, author

// Buy keywords - buy, get, purchase, wtb, store, centre, amazon