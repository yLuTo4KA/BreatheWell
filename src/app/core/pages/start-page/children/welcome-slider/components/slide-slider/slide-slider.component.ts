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
      subtitle: "Расслабляемся и улучшаем качество сна.",
      image: "assets/images/slide2.png"
    },
    {
      title: "Становимся более продуктивными",
      subtitle: "Помогаем зарядиться энергией и повысить эффективность работы.",
      image: "assets/images/slide3.png"
    },
    {
      title: "Учимся концентрации",
      subtitle: "Техники дыхания для фокуса и ясности ума в самые важные моменты.",
      image: "assets/images/slide4.png"
    },
    {
      title: "Боремся с негативными мыслями",
      subtitle: "Отпускаем негатив и восстанавливаем позитивное мышление.",
      image: "assets/images/slide5.png"
    }
  ]
}
