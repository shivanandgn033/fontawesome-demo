
import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  coffeeIcon!: SafeHtml;
  twitterIcon!: SafeHtml;
  faCoffee = faCoffee;

  constructor(private sanitizer: DomSanitizer) {
    // Add icons to the library (only once, ideally in a service or app.module)
    library.add(faCoffee, faTwitter);
  }

  ngOnInit(): void {
    // Get the SVG icon as an HTML string
    const coffeeSvg = icon(faCoffee).html[0];
    const twitterSvg = icon(faTwitter).html[0];


    // Sanitize the HTML to prevent security vulnerabilities
    this.coffeeIcon = this.sanitizer.bypassSecurityTrustHtml(coffeeSvg);
    this.twitterIcon = this.sanitizer.bypassSecurityTrustHtml(twitterSvg);
  }

}
