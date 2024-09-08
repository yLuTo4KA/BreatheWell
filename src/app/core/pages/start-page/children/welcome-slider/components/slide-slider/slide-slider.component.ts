import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-slider',
  templateUrl: './slide-slider.component.html',
  styleUrls: ['./slide-slider.component.scss']
})
export class SlideSliderComponent {
  contents = [
    {
      title: "Изучаем дыхание:",
      subtitle: "Интересные материалы, объясняющие, как дыхание влияет на тело и разум.",
      image: "assets/images/harmony.png"
    },
    {
      title: "Отслеживаем прогресс: ",
      subtitle: "Следи за своими успехами и вырабатывай привычку",
      image: "assets/images/tree.png"
    },
    {
      title: "Изучаем дыхание:",
      subtitle: "Интересные материалы, объясняющие, как дыхание влияет на тело и разум.",
      image: "assets/images/tree.png"
    }
  ]
}
