// Shared by index.html and testimonials.html so the card markup only
// needs to be maintained in one place.
function renderTestimonialCard(t, extraClassName) {
  var card = document.createElement("figure");
  card.className = "testimonial-card" + (extraClassName ? " " + extraClassName : "");

  var quote = document.createElement("blockquote");
  quote.textContent = t.quote;
  card.appendChild(quote);

  var byline = document.createElement("figcaption");
  byline.className = "testimonial-byline";

  if (t.photo) {
    var img = document.createElement("img");
    img.className = "testimonial-photo";
    img.src = t.photo;
    img.alt = t.name;
    img.width = 56;
    img.height = 56;
    byline.appendChild(img);
  }

  var who = document.createElement("div");
  var name = document.createElement("div");
  name.className = "testimonial-name";
  name.textContent = t.name;
  who.appendChild(name);
  if (t.title) {
    var title = document.createElement("div");
    title.className = "testimonial-title";
    title.textContent = t.title;
    who.appendChild(title);
  }
  byline.appendChild(who);

  card.appendChild(byline);
  return card;
}
