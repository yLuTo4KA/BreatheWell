import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-slider',
  templateUrl: './slide-slider.component.html',
  styleUrls: ['./slide-slider.component.scss']
})
export class SlideSliderComponent {
  contents = [
    {
      title: "Снижаем уровень стресса",
      subtitle: "Интересные материалы, объясняющие, как дыхание влияет на тело и разум.",
      image: "assets/images/harmony.png"
    },
    {
      title: "Улучшаем сон",
      subtitle: "Следи за своими успехами и вырабатывай привычку.",
      image: "assets/images/slide2.png"
    },
    {
      title: "Становимся более продуктивными",
      subtitle: "Специальные дыхательные практики с детальными инструкциями.",
      image: "assets/images/slide3.png"
    },
    {
      title: "Учимся концентрации",
      subtitle: "Интересные материалы, объясняющие, как дыхание влияет на тело и разум.",
      image: "assets/images/slide4.png"
    },
    {
      title: "Боремся с негативными мыслями",
      subtitle: "Учимся использовать дыхание для управления стрессом, сном и повседневными задачами.",
      image: "assets/images/slide5.png"
    }
  ]
}
