# FeedTheMonsterH5P
<div id="top"></div>









[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]










<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#play-the-game">Play the Game</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#additional-dependencies">Additional Dependencies</a></li>
        <li><a href="#pre-requisites">Pre-requisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a>
    <ul>
    <li><a href="#creating-a-new-language-version">Creating a new language version</a></li>
    <li><a href="#compile-and-build-the-new-version">Compile and build the new version</a></li>
    <li><a href="#export-and-upload-to-a-wordpress-server">Export and upload to a Wordpress server</a></li>
    <li><a href="#creating-a-new-gameplay-feature">Creating a new gameplay feature</a></li>
    </ul></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Feed The Monster teaches your child the fundamentals of reading. Collect monster eggs and feed them letters so they can grow into new friends!


**WHAT IS FEED THE MONSTER?**

Feed The Monster uses proven ‘play to learn’ techniques to engage kids and help them learn to read. Children enjoy collecting and growing pet monsters while learning reading fundamentals.


**GAME FEATURES TO PROMOTE READING SKILLS:**

• Fun and engaging phonics puzzles 

• Letter tracing games to aid reading and writing

• Vocabulary memory games.

• Challenging “sound only” levels

• Parental progress report.

• Collectable, evolvable, and fun monsters

• Designed to promote socio-emotional skills.

**DEVELOPED BY EXPERTS FOR YOUR CHILD.**

The game is based on years of research and experience into the science of literacy. It incorporates key skills for literacy, including Phonological Awareness, Letter Recognition, Phonics, Vocabulary, and Sight Word Reading so kids can develop a strong foundation for reading. Built around the concept of caring for a collection of monsters, it is designed to encourage empathy, perseverance and socio-emotional development for children.

**WHO ARE WE?**

Feed the Monster was funded by the Norwegian Ministry of Foreign Affairs as part of the EduApp4Syria-competition. The original Arabic app was developed as a joint venture between Apps Factory, The Center for Educational Technology (CET) and The International Rescue Committee (IRC).

Feed the Monster was adapted to English by Curious Learning, a non-profit dedicated to promoting access to effective literacy content for everyone who needs it. We're a team of researchers, developers, and educators dedicated to giving children everywhere literacy education in their native language based on evidence and data – and are working to bring Feed The Monster to 100+ high-impact languages around the world.

### Play the Game
This version of Feed The Monster was created specifically for web-enabled smartphone and tablet devices. To play the game, please follow the appropriate language links on a phone or tablet:

 #### [English Version](https://devcuriousreader.wpcomstaging.com/book/feed-the-monsterenglish/)

 #### [French Version](https://devcuriousreader.wpcomstaging.com/book/feedthemonsterfrench-1-0/)

 #### [Swahili Version](https://devcuriousreader.wpcomstaging.com/book/feed-the-monsterswahili/)

 #### [Arabic Version](https://devcuriousreader.wpcomstaging.com/book/feed-the-monsterarabic/)

To create new language versions, please refer to our [Adding New Languages](https://github.com/curiouslearning/FeedTheMonsterH5P/edit/main/README.md#adding-new-languages) section below which will detail the process of making the app using pre-populated JSON files for 50+ languages and links to the Creative Commons audio files for those languages.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

**_NOTE:_**  The following documentation was created respective to the Windows operating system. When describing file paths, the home path will be ``` C:\xampp\htdocs\```-- please substitute your own home path if you are using an operating system other than Windows.


### Built With


* [![React][React.js]][React-url]
* H5P


### Additional Dependencies

 ```
    "classnames": "^2.3.1",
    "drag-drop": "^7.2.0",
    "howler": "^2.2.3",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-drag-and-drop": "^3.0.0",
    "react-drag-drop-container": "^6.1.1",
    "react-draggable": "^4.4.5",
    "react-full-screen": "^1.1.1",
    "react-icons": "^4.4.0",
    "react-responsive": "^9.0.0-beta.10",
    "react-responsive-spritesheet": "^2.3.9" 
```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->

### Pre-requisites

In order to utilize the contents of this repository, we will need to install the Node Package Manager locally on a development machine using the command prompt: 
 
 ```sh
  npm install npm@latest -g
  ```
  
Additionally we will need access to a Content Management System or Learning Management System (like Drupal, Wordpress, etc.) that is [compatible with H5P](https://h5p.org/installation). For this particular documentation, we will be utilizing a Drupal 7 installation.  

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation

The following steps will walk through a local development setup for building and deploying Feed The Monster using an XAMPP, Drupal 7 & H5P infrastructure stack.

1.	[Download and install XAMPP](https://www.apachefriends.org/download.html) for your operating system with PHP version 7.4.16.

2.	When trying to run the Apache server, if it complains about port 80 being taken:

    a.	Open the XAMPP control panel.

    b.	On the row that has Apache controls click ‘Config’ and choose the very first option ‘Apache (httpd.conf)’.

    c.	In this file, find the line that starts with: 

        `Listen 80`

    d.	Change 80 to a new, unused port number-- such as 5555-- like so:

        `Listen 5555`

    e.	Save the configuration file.

    f.	Exit the text editor and restart the Apache server from the XAMPP control panel.

3.	Next, we need to [download and install Drupal 7.x](https://www.drupal.org/project/drupal/releases/7.80). Please pick the latest Drupal 7.x version from the Other Releases sidebar on the website. Unpack the downloaded file under the default location for XAMPP which is `~/xampp/htdocs/`.

4.	(Optional) Change the title of the unpacked folder to ‘drupal’ for later clarity.

5.	Open up a web browser of choice and navigate to: 

    `localhost:5555/phpmyadmin` (5555 being the port number that you set in the httpd.conf file in step 3).

6.	In the PHPMyAdmin panel, find and click the ‘Databases’ navigation menu button.

7.	Under ‘Create Database’, type in a database name (e.g ‘drupal-h5p’), and click the ‘Create’ button.

8.	Open up a web browser and navigate to:

    `localhost:5555/drupal`

    If all is well, we will be able to see the Drupal installation guide. If the guide displays an error message that says the extension ‘gd’ is not  enabled:

      a.	Open the XAMPP control panel.

      b.	On the row that has Apache controls click ‘Config’ and choose the very first option ‘PHP (php.ini)’.

      c.	In that file find the line that starts with ‘;extension=gd2’ replace it with ‘extension=gd2’.

      d.	Save the file, reload the Apache server, and visit the same Drupal installation guide page at `localhost:5555/drupal`.

9.	If the Drupal installation guide displays a warning that says ‘PHP OPCODE CACHING’ you either have to install the displayed plugin or scroll down and click the ‘continue anyway’ option.

10.	On the ‘Set up database’ step, type in the name of the database created in step 7 (e.g ‘drupal-h5p’). In the ‘Database username’ field type in root and the password field is optional.

11. After the Drupal installation completes,	fill in the details in the ‘Configure Site’ form and Drupal should be ready to go.

12.	Find the [latest version of H5P for Drupal 7.x](https://www.drupal.org/project/h5p) (e.g ‘7.x-1.48 released 22 April 2019’) and click download either in .zip or .tar.gz format.

13.	Unpack the download archive file on your local machine under `~/xampp/htdocs/drupal/modules`.

15.	In a web browser, go back to the Drupal admin panel:

  `localhost:5555/drupal/`

16.	Click the ‘Modules’ navigation button.

17.	Scroll down on the modules page or find ‘H5P’ using the browser’s search function.

18.	Select both ‘H5P’ and ‘H5P Editor’ and click the ‘Save Configuration’ button underneath.

19.	Click the ‘Configure’ navigation button on the top navbar, then click on H5P under the system configuration group, scroll down, and enable both:

    a.	H5P development mode

    b.	Library development directory (for programmers only)

20.	If everything is working correctly you should see the Interactive Content type when you click ‘Add Content’ from the top menu.

21. Next let's clone the project:

    a. In a command prompt, navigate to `C:\xampp\htdocs\drupal\sites\default\files\h5p\development`

    b. Clone the repo by running the following:
        ```
        git clone https://github.com/curiouslearning/FeedTheMonsterH5P.git
        ```
        
    c. Next install NPM packages:
        ```
        npm install
        ```
        
    d. And finally run the final command:
        ```
        npm run dev
        ```

22. Open a browser and navigate to: 

  `http://localhost/drupal/`

23. Click on ‘Add Content’, then ‘Interactive Content’, and finally select the content type having the same title provided in library.json (e.g. OER React Slideshow New).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Creating a new language version
 
For creating a new language version of Feed The Monster, we will need to replace the current repo's JSON file with an [appropriate language JSON file](https://github.com/curiouslearning/ftm-asset-api/tree/main/fulljsons) or create a new language JSON file using any of the language JSON files linked as a template.  

Once a language JSON file has been selected, we will need to replace and update the existing JSON content located here: 

```C:\xampp\htdocs\drupal\sites\default\files\h5p\development\FeedTheMonsterH5P\src\data\example-return.js.```

Here is a code snippet from ```C:\xampp\htdocs\drupal\sites\default\files\h5p\development\FeedTheMonsterH5P\src\data\example-return.js``` for reference to where the new JSON will need to be inserted:


``` const gameData = {
  GeneralData: {
    LanguageName: "English",
    LanguageVersion: 44,
    ImageBasedRendering: false,
    GeneralAudio: {
      GreatAudio: "http://server.com/audio/english/feedback/great.wav",
      FantasticAudio: "http://server.com/audio/english/feedback/fantastic.wav",
      A: "https://server.com/USENGLISH_sounds_letters_a.wav",
    },
    GeneralImages: {
      GreatImage: "http://server.com/images/english/feedback/great.png",
      FantasticImage: "http://server.com/images/english/feedback/fantastic.png",
    },
  },
  FeedbackTexts: ["Fantastic!","Great!","Amazing!"],
  

  // Paste the language specific json here


  };

export default gameData;
```

Please note that above the language JSON in this JS file are meta variables that will help distinguish different language builds (e.g. LanguageName) and even versioning information (e.g. LanguageVersion) for the JSON itself that are helpful in maintaining the app or troubleshooting issues. Also note that all server URLs such as server.com/... and curiousreader.org/... will need to be replaced with the URLs where language-specific images or audio are uploaded ultimately. All existing [language-specific images and audio](https://github.com/curiouslearning/ftm-languagepacks) can be downloaded and used as Creative Commons.

<p align="right">(<a href="#top">back to top</a>)</p>

### Compile and build the new version

1.  For compiling a newer version of the Feed The Monster app, go to the library.json file and increase the "patchVersion" by 1 in both the 

`C:\xampp\htdocs\drupal\sites\default\files\h5p\development\FeedTheMonsterH5P\library.json`

 and

`C:\xampp\htdocs\drupal\sites\default\files\h5p\development\FeedTheMonsterH5P\src\library.json` files.

2.  To get the new .h5p file, open http://localhost/drupal/, click on 'Add Content', click on 'Interactive Content', and from there select the content type having the same title provided in the library.json file.

3. After adding the content, a new H5P file will get created on your local machine's `C:\xampp\htdocs\drupal\sites\default\files\h5p\exports` directory. At this point, we should have a new build of our Feed The Monster app that can be ported to other CMS's or LMS's!


<p align="right">(<a href="#top">back to top</a>)</p>

### Export and upload to a Wordpress server

The following section is NOT necessary in understanding the Feed The Monster build process but is supplementary information if we have decided to use a Wordpress server with the Freelearning Wordpress theme for publishing the app.

1.  Open the Wordpress server and click on 'H5P Content' in the navigation sidebar.

2. Click on 'Add New', select 'Upload' option, and upload the .h5p file we exported to this
   `C:\xampp\htdocs\drupal\sites\default\files\h5p\exports` directory. Click on the 'Create' button and make sure to remember the H5P ID number.

3. In the navigation sidebar, click on the 'Books', then 'Add New', and write the title of the upload.

4. In the 'Custom' field select 'H5P ID' and input the number we received in step 2.

5. Add a new language tag in the sidebar on the right for filtering purposes and then click 'Publish' to make this version of the app live on a Wordpress server using the Freelearning Wordpress theme.

<p align="right">(<a href="#top">back to top</a>)</p>

### Creating a new gameplay feature
    
To help understand how to extend functionality of this version of Feed The Monster, we will be creating a theoretical feature of adding a scoreboard to the main gameplay screen when a user answers a question in Feed The Monster.

For creating this new gameplay feature, navigate to `C:\xampp\htdocs\drupal\sites\default\files\h5p\development\FeedTheMonsterH5P\src\components\Slide.tsx` on your local machine.
 
Here you will find the ```SlideComponent``` where you can use your components and share data using props as per the requirement.
   
   1. Create a folder named Score-Board both in src\components ```ScoreBoard.tsx ``` and ```score-board.css``` file.

   2. Create and export your ```ScoreBoard``` component along with all the necessary imports of components and CSS.

   3. Go to the ```slide.tsx``` there in  ```SlideComponent``` import your component there and utilise your component there.

   For the reference the ```ScoreBoard``` is already done and has been commented out.

   In order to utilise the ```ScoreBoard``` just go to ```ScoreBoard.tsx``` and uncomment all the commented part.

   Here's is the code snippet for ScoreBaord

   ``` import React from "react";
import "./score-board.css";
import scoreBoardBg from "../../../assets/images/score_v01.png";
import { getImagePath } from "../../app";
const ScoreBoard = (props: any) => {
  return (
    <div
      className="score-board"
      style={{
        backgroundImage: `url(${getImagePath() + "score_v01.png"})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
       <h3 style={{ textAlign: "center", fontSize: "2.1em" }}>{props.score}</h3>
    </div>
  );
};


export default ScoreBoard;
```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

The Feed The Monster codebase is open source and we freely encourage others to extend, remix, or localize the content herein, including the audio and graphical content which is licensed under CC-BY. 

In our exploration of this React version of Feed The Monster, we found React to have a few major shortcomings-- namely the ability to play fluid, pre-loaded animations which we feel is paramount to child engagement. We are embarking on a re-write of the code instead using [vanilla Javascript and HTML canvas](https://github.com/curiouslearning/FeedTheMonsterJS) and encourage you to follow along with the progress of this project.

#### Contribution guidelines coming soon

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact
 #### If you'd like to contact us, please feel free to e-mail us at info@curiouslearning.org.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

#### The Sutara Development Team
* Rajesh Kumar Choudhary
* P Vinay Kumar Reddy
* Rakshith Acharya
* ASHISH KUMAR
* Mary Harshitha A
* Ashish M
* Amit Kumar Singh

<p align="right">(<a href="#top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/badge/Contributors-lightgrey?style=for-the-badge
[contributors-url]: https://github.com/curiouslearning/FeedTheMonsterH5P/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/curiouslearning/FeedTheMonsterH5P?style=for-the-badge
[forks-url]: https://github.com/curiouslearning/FeedTheMonsterH5P/network/members
[stars-shield]:https://img.shields.io/github/stars/curiouslearning/FeedTheMonsterH5P?style=for-the-badge
[stars-url]: https://github.com/curiouslearning/FeedTheMonsterH5P/stargazers
[issues-shield]: https://img.shields.io/github/issues/curiouslearning/FeedTheMonsterH5P?style=for-the-badge
[issues-url]: https://github.com/curiouslearning/FeedTheMonsterH5P/issues
[license-shield]: https://img.shields.io/github/license/curiouslearning/FeedTheMonsterH5P?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
