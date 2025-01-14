## Fontawesome demo

TypeScript

```typescript
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
```

### Key changes and explanations for Angular 19+ and best practices:

#### 1 @fortawesome/angular-fontawesome package: The recommended approach is to use the dedicated Angular package:

Bash
```bash
npm install @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
```
#### 2 Importing Icons: Import only the specific icons you need. This drastically reduces your bundle size.

TypeScript
```typescript
import { faCoffee, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
```
#### 3 Adding to Library (Once): Add the icons to the Font Awesome library once in your application, ideally in your import[FontawesomeModule] or a shared service. This avoids redundant processing.

TypeScript
```typescript
import { library } from '@fortawesome/fontawesome-svg-core';
// ... other imports
library.add(faCoffee, faCheckSquare, faTwitter);
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
```
#### 4 Using the <fa-icon> Component (Recommended): Use the <fa-icon> component in your templates. This is the cleanest and most efficient way.

HTML
```html
<fa-icon [icon]="faCoffee"></fa-icon> <br/>
<fa-icon [icon]="['fab', 'twitter']"></fa-icon> <br/>
<fa-icon icon="coffee"></fa-icon>
```
For solid icons, you can pass the icon object directly (e.g., [icon]="faCoffee").
For brand icons, you need to pass an array ['fab', 'twitter'] where 'fab' is the style prefix.
You can also use string literals for solid icons if you've added them to the library (e.g. icon="coffee").

#### 5 Direct SVG Rendering (Less Recommended): If you absolutely need to render the SVG directly (e.g., for very specific styling or manipulation), you can still do it but use the DomSanitizer correctly. This is generally less efficient than using the component.

TypeScript
```typescript 
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// ...
constructor(private sanitizer: DomSanitizer) {}
ngOnInit() {
    this.coffeeIcon = this.sanitizer.bypassSecurityTrustHtml(icon(faCoffee).html[0]);
}
```
Crucially: Use this.sanitizer.bypassSecurityTrustHtml() to avoid security vulnerabilities.

By following these updated steps, you'll have a much cleaner, more efficient, and secure implementation of Font Awesome in your Angular 19 project. The use of <fa-icon> is strongly recommended for most use cases.
