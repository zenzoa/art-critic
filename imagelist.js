(function () {
  var urlArt = "https://appsheettest1.azurewebsites.net/sample/art";

  $( document ).ready( function() {
    getIDs( urlArt, 0, 10 );
  });

  // Creates a gallery of artwork from a list of IDs.
  function createArtGallery( idList ) {
    idList.forEach( function( id ) {
      getArtFromID( id );
    });
  }

  // Gets data on a piece of art given its ID and displays it.
  function getArtFromID( id ) {
    var jsonArt = $.getJSON( urlArt + '/' + id )
      .done( displayArt )
      .fail( function() {
        console.log( "Unable to retrieve artwork " + id );
      });
  }

  // Creates HTML to display a piece of art.
  function displayArt( data ) {
    var urlImage = data.thumbnailUrl;
    console.log( urlImage );
    $( "#images" ).append( '<img src="'+ urlImage +'">' );
  }

  // Gets a list of ID numbers from a URL.
  function getIDs( url, first, last ) {
    var file = $.get( url )
      .done( function( data ) {
        if ( typeof( data ) === "object" ) {
          createArtGallery(
            convertToNumbers(
              data.slice( first, last ) ) );
        } else {
          console.log( "ID list not in correct format" );
        }
      })
      .fail( function() {
          console.log( "Unable to retrieve IDs" );
      });
  }

  // Convert list of strings to list of integers.
  function convertToNumbers( stringArray ) {
    return stringArray
      .map( function( n ) {
        return parseInt( n );
      })
      .filter( function( n ) {
        return !isNaN( n );
      });
  }

  // Parse a comma-delimited string of numbers into an array.
  // (Don't actually need this since jQuery returns the array pre-parsed.)
  function parseList( string ) {
    return string
              .replace(/^\[\]/g, '')
              .split(",");
  }

})();
