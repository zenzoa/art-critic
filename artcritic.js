(function () {

  var urlArt = "https://appsheettest1.azurewebsites.net/sample/art";
  var artList = [];
  var currentIndex = 0;


  // Start everything when the page loads.
  $( document ).ready( function() {
    $( "#imageCard" ).show();
    $( "#commentCard" ).hide();

    var options = {
      preventDefault: true
    };

    // Setup click callbacks.
    $( '#prevCard' ).click( prevCard );
    $( '#nextCard' ).click( nextCard );
    $( '#commentCount' ).click( toggleComments );

    getIDs( urlArt )
      .then( function( data ) {
        artList = data;
        getArtData( artList[0] )
          .then( fillArtCard );
      });
  });


  // Load previous art card.
  function prevCard() {
    currentIndex --;
    if ( currentIndex < 0 ) {
      currentIndex = artList.length-1;
    }
    getArtData( artList[ currentIndex ] )
      .then( fillArtCard );
  }


  // Load next art card.
  function nextCard() {
    currentIndex ++;
    if ( currentIndex >= artList.length ) {
      currentIndex = 0;
    }
    getArtData( artList[ currentIndex ] )
      .then( fillArtCard );
  }


  // Open and close comment section.
  function toggleComments() {
    $( "#imageCard" ).toggle();
    $( "#commentCard" ).toggle();
    if ( $( "#commentCount" ).hasClass( "closed" ) ) {
      $( "#commentCount" ).addClass( "open" );
      $( "#commentCount" ).removeClass("closed");
    } else {
      $( "#commentCount" ).addClass( "closed" );
      $( "#commentCount" ).removeClass("open");
    }
  }


  // Fill out the art card with appropriate data.
  function fillArtCard( data ) {
    //$( "#imageCard #file" ).attr( "src", data.thumbnailUrl
    $( "#imageCard #imageFile" ).css( "background-image", "url('" + data.thumbnailUrl + "')" );
    $( "#imageCard #title" ).html( data.title );
    $( "#imageCard #artist" ).html( data.artist );
    $( "#imageCard #year" ).html( data.year );
    $( "#imageCard #more a" ).attr( "href", data.url );
    $( "#imageCard #price" ).html( '$' + data.id );
  }


  // Returns art data from a given ID.
  function getArtData( id ) {
    return $.getJSON( urlArt + '/' + id )
      .then( function( data ) {
        return data;
      });
  }


  // Returns an array of IDs from the given URL.
  function getIDs( url, first, last ) {
    return $.get( url )
      .then( function( data ) {
        if ( typeof( data ) === "object" ) {
          return convertToNumbers( data.slice( first, last ) );
        } else {
          throw new Error( "ID list not in correct format" );
        }
      })
      .fail( function() {
        throw new Error( "Unable to get ID list" );
      });
  }


  // Converts an array of strings to an array of integers.
  function convertToNumbers( stringArray ) {
    return stringArray
      .map( function( n ) {
        return parseInt( n );
      })
      .filter( function( n ) {
        return !isNaN( n );
      });
  }


  // Parses a comma-delimited string of numbers into an array.
  // (Don't actually need this since jQuery returns the array pre-parsed.)
  function parseList( string ) {
    return string
              .replace(/^\[\]/g, '')
              .split(",");
  }

})();
