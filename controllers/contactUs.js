exports.getContactUs = (req, res, next) => {
    res.render('contact-us', { 
        pageTitle: 'Contact Us',
        path: '/contact-us',
        formsCSS: true,
        productCSS: true,
        activeContactUs: true
     });
  };
  