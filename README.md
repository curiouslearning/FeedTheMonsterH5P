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
    <li><a href="#compiling-new-versions">Compiling New Versions</a></li>
    <li><a href="#adding-new-languages">Adding New Languages</a></li>
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

<!-- GETTING STARTED -->
## Getting Started

These are the neccesary steps for setting up the project locally.
To get a local copy up and running follow these simple example steps.


### Built With


* [![React][React.js]][React-url]


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->

### Prerequisites

These are the following Prerequisities required for the project:
* npm
  ```sh
  npm install npm@latest -g
  ```

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





1. Got to the (C:\xampp\htdocs\drupal\sites\default\files\h5p\development),

2. Clone the repo here
   ```sh
   git clone https://github.com/curiouslearning/FeedTheMonsterH5P/tree/megredAll
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run 
```sh
npm run dev
```
in the terminal.


25.Open Any Browser and go to http://localhost/drupal/.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage



### Compiling New Versions

For Compiling newer versions go to the library.json file and increase the "patchVersion" by 1 in both the C:\xampp\htdocs\drupal\sites\default\files\h5p\development\FeedTheMonsterH5P\library.json
 and
  C:\xampp\htdocs\drupal\sites\default\files\h5p\development\FeedTheMonsterH5P\src\library.json folder.

### Adding New Languages 

For adding new languages the older json shall be replaced by the new language json in the C:\xampp\htdocs\drupal\sites\default\files\h5p\development\FeedTheMonsterH5P\src\data\example-return.js.

### Creating New Wordpress Build

For Creating the Wordpress build go to C:\xampp\htdocs\drupal\sites\default\files\h5p\exports
and Upload the h5p file.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap



<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing



<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments



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
