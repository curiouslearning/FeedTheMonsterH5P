# FeedTheMonsterH5P
<div id="top"></div>









[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]










<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#additional-dependencies-utilised">Additional Dependencies Utilised</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a>
    <ul>
    <li><a href="#adding-new-languages">Adding New Languages</a></li>
    <li><a href="#compiling-new-versions">Compiling New Versions</a></li>
    <li><a href="#creating-new-wordpress-build">Creating New Wordpress Build</a></li>
    </ul></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Feed The Monster teaches your child the fundamentals of reading. Collect monster eggs and feed them letters so they can grow into new friends!

WHAT IS FEED THE MONSTER?

Feed The Monster uses proven ‘play to learn’ techniques to engage kids and help them learn to read. Children enjoy collecting and growing pet monsters while learning reading fundamentals.


GAME FEATURES TO PROMOTE READING SKILLS:

• Fun and engaging phonics puzzles 

• Letter tracing games to aid reading and writing

• Vocabulary memory games.

• Challenging “sound only” levels

• Parental progress report.

• Collectable, evolvable, and fun monsters

• Designed to promote socio-emotional skills.

DEVELOPED BY EXPERTS FOR YOUR CHILD.

The game is based on years of research and experience into the science of literacy. It incorporates key skills for literacy, including Phonological Awareness, Letter Recognition, Phonics, Vocabulary, and Sight Word Reading so kids can develop a strong foundation for reading. Built around the concept of caring for a collection of monsters, it is designed to encourage empathy, perseverance and socio-emotional development for children.

WHO ARE WE?

Feed the monster was funded by the Norwegian Ministry of Foreign Affairs as part of the EduApp4Syria-competition. The original Arabic app was developed as a joint venture between Apps Factory, The Center for Educational Technology (CET) and The International Rescue Committee (IRC).


Feed the Monster was adapted to English by Curious Learning, a non-profit dedicated to promoting access to effective literacy content for everyone who needs it. We're a team of researchers, developers, and educators dedicated to giving children everywhere literacy education in their native language based on evidence and data – and are working to bring Feed The Monster to 100+ high-impact languages around the world.
<p align="right">(<a href="#top">back to top</a>)</p>

**_NOTE:_**  The Following content is created with respective to Windows Operating System and the home path will be ``` C:\xampp\htdocs\```. It will not be efftective on any other Opearating System.


<!-- GETTING STARTED -->
## Getting Started

These are the neccesary steps for setting up the project locally.
To get a local copy up and running follow these simple example steps.


### Built With


* [![React][React.js]][React-url]


<p align="right">(<a href="#top">back to top</a>)</p>


### Additional Dependencies Utilised 

 ```"classnames": "^2.3.1",
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

<!-- GETTING STARTED -->

### Prerequisites

These are the following Prerequisities required for the project:
* npm
  ```sh
  npm install npm@latest -g
  ```
* H5p





### Installation

XAMPP, Drupal 7 & H5P Installation Guide

1.	Download and install the XAMPP for your operating system with PHP version 7.4.16 from here https://www.apachefriends.org/download.html.

2.	When trying to run the Apache server, if it complains about port 80 being taken:

a.	Open the XAMPP control panel.

b.	On the row that has Apache controls click ‘Config’ and choose the very first option ‘Apache (httpd.conf)’.

c.	In that file look for the line that starts with ‘Listen 80’.

d.	Change 80 to a new port number, 5555 as an example like so ‘Listen 5555’.

e.	Save the configuration file.

f.	Exit the text editor and restart the apache server from the XAMPP control panel.

3.	Next, we need to install Drupal 7.x which can be found and downloaded from here https://www.drupal.org/project/drupal/releases/7.80. Please pick the latest Drupal 7.x version from the Other Releases sidebar on the website. Unpack the downloaded file under /xampp/htdocs/.

4.	(Optional) Change the title of the unpacked folder to ‘drupal’ as an example.

5.	Open up a web browser of your choice, type in the address bar ‘localhost:5555/phpmyadmin’ (5555 is the port number that you set in the httpd.conf file), and press enter.

6.	In the PHPMyAdmin panel find and click the ‘Databases’ navigation menu button.

7.	Under the ‘Create Database’ type in the database name e.g ‘drupal-h5p’ and click the ‘Create’ button.

8.	Open up a web browser, type in ‘localhost:5555/drupal’, and press enter. You should be able to see the Drupal installation guide. If the guide displays an error message that says the extension ‘gd’ is not enabled:

a.	Open the XAMPP control panel.

b.	On the row that has Apache controls click ‘Config’ and choose the very first option ‘PHP (php.ini)’.

c.	In that file find the line that starts with ‘;extension=gd2’ replace it with ‘extension=gd2’.

d.	Save the file, reload the Apache server and visit the same drupal installation guide page ‘localhost:5555/drupal’.

9.	If the Drupal installation guide displays a warning that says ‘PHP OPCODE CACHING’ you either have to install the displayed plugin or scroll down and click the ‘continue anyway’ option.

10.	On the ‘Set up database’ step type in the name of the database that you created e.g ‘drupal-h5p’. In the ‘Database username’ field type in root and the password field is optional.

11.	Wait for the Drupal installation to complete.

12.	Fill in the details in the ‘Configure Site’ form and Drupal should be ready to go.

13.	Find the latest version of H5P for Drupal 7.x here https://www.drupal.org/project/h5p e.g ‘7.x-1.48 released 22 April 2019’ and click download either in .zip or .tar.gz format.

14.	Unpack the download archive file under /xampp/htdocs/drupal/modules.

15.	In the web browser go back to the Drupal admin panel ‘localhost:5555/drupal/’.

16.	Click the ‘Modules’ navigation button.

17.	Scroll down on the modules page or find ‘H5P’ using the browser’s search function.

18.	Select both ‘H5P’ and ‘H5P Editor’ and click the ‘Save Configuration’ button underneath.

19.	Click the ‘Configure’ navigation button on the top navbar, then click on H5P under the system configuration group, scroll down, and enable both:

a.	H5P development mode

b.	Library development directory (for programmers only)

20.	If everything is working correctly you should see the Interactive Content type when you click Add Content from the top menu.



21. Cloning the project

* Got to the (C:\xampp\htdocs\drupal\sites\default\files\h5p\development),

* Clone the repo here
   ```sh
   git clone https://github.com/curiouslearning/FeedTheMonsterH5P.git
   ```
* Install NPM packages
   ```sh
   npm install
   ```
* Run 
```sh
npm run dev
```
in the terminal.


22. Open Any Browser and go to http://localhost/drupal/.

23. Click on Add content,then click on interactive content there select the content type having the same title provided in library.json.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Creating a new language version
 
For adding new languages the older json shall be replaced by downloading the Language specific json file from

 ```https://github.com/curiouslearning/ftm-asset-api/tree/main/fulljsons``` 

and replace the older json from  

```C:\xampp\htdocs\drupal\sites\default\files\h5p\development\FeedTheMonsterH5P\src\data\example-return.js.```

then save and  compile it.

Here's is code snippet from ```C:\xampp\htdocs\drupal\sites\default\files\h5p\development\FeedTheMonsterH5P\src\data\example-return.js```for the Reference


``` const gameData = {
  GeneralData: {
    LanguageName: "English",
    LanguageVersion: 44,
    ImageBasedRendering: false,
    GeneralAudio: {
      GreatAudio: "http://server.com/audio/english/feedback/great.wav",
      FantasticAudio: "http://server.com/audio/english/feedback/fantastic.wav",
      A: "https://curiousreader.org/wp-content/uploads/2022/05/USENGLISH_sounds_letters_a.wav",
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

### Compile and build the new version

1.  For Compiling newer versions go to the library.json file and increase the "patchVersion" by 1 in both the 

C:\xampp\htdocs\drupal\sites\default\files\h5p\development\FeedTheMonsterH5P\library.json

 and

  C:\xampp\htdocs\drupal\sites\default\files\h5p\development\FeedTheMonsterH5P\src\library.json folder.

2.  To get the new h5p file,Open the  http://localhost/drupal/  and Click on Add content,then click on interactive content there select the content type having the same title provided in library.json.

3. After adding the content new H5p file will get created in this 

"C:\xampp\htdocs\drupal\sites\default\files\h5p\exports" directory, use this file to upload to server



### Export and upload to webserver

1.  Open the WordPress Server and Click on the H5P Content.

   2. Click on add new and select upload option and select  the H5p file present in this
   "C:\xampp\htdocs\drupal\sites\default\files\h5p\exports" directory and then click on the create Button , make sure to  remember the H5p Id .

   3. Click on the Books > Add new,   Write the Title
   4. In the Custom field select name in the dropdown as h5p Id and give the value (from step you can get the value)
   5. Add new Language Tag as English ,Then Click on Publish

<p align="right">(<a href="#top">back to top</a>)</p>

### Creating a New Gameplay Feature


    
    
 For creating new gameplay features go to the ```slide.tsx```(C:\xampp\htdocs\drupal\sites\default\files\h5p\development\FeedTheMonsterH5P\src\components\Slide.tsx) 
 
 there you will find the ```SlideComponent``` where you can use your components and share data using props as per the requirement.
   For example adding  Score-Board feature to the main gameplay screen:
   
   1. Create a folder named Score-Board in that create both in src\components  ```ScoreBard.tsx ``` and ```score-board.css``` file.

   2. Create and Export your ```ScoreBoard``` Component along with all the necessary imports of components and Css.

   3. go to the ```slide.tsx``` there in  ```SlideComponent``` import your component there and utilise your component there.

   For the reference the ```ScoreBoard``` is already done and is being commented.

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

### Other Language Version
 Here are other Versions for the game built for different Languages:

 #### English Version
 * https://devcuriousreader.wpcomstaging.com/book/feed-the-monsterenglish/

 #### French Version
 * https://devcuriousreader.wpcomstaging.com/book/feedthemonsterfrench-1-0/
 #### Swahili Version
 * https://devcuriousreader.wpcomstaging.com/book/feed-the-monsterswahili/

 #### Arabic Version
 * https://devcuriousreader.wpcomstaging.com/book/feed-the-monsterarabic/






<!-- CONTRIBUTING -->
## Contributing

#### Contribution guidelines coming soon

<p align="right">(<a href="#top">back to top</a>)</p>






<!-- CONTACT -->
## Contact
 #### If you'd like to contact us, please feel free to e-mail us at info@curiouslearning.org.
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

#### The Sutara Development Team --
* Rajesh Kumar Choudhary,
*  P Vinay Kumar Reddy,
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
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 