from django.db import models

class HeroSettings(models.Model):
    name = models.CharField(max_length=100, default="Abdelrhaman")
    role_description = models.TextField(default="a 3d creator driven by crafting striking and unforgettable projects")
    portrait = models.ImageField(upload_to='hero/', blank=True, null=True)

    class Meta:
        verbose_name = "Hero Settings"
        verbose_name_plural = "Hero Settings"

    def __str__(self):
        return f"Hero Settings: {self.name}"

    def save(self, *args, **kwargs):
        # Ensure only one instance of HeroSettings exists
        if not self.pk and HeroSettings.objects.exists():
            # Retrieve the first one and overwrite it
            self.pk = HeroSettings.objects.first().pk
        super().save(*args, **kwargs)


class AboutSettings(models.Model):
    main_text = models.TextField(default="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!")
    moon_icon = models.ImageField(upload_to='about/', blank=True, null=True)
    lego_icon = models.ImageField(upload_to='about/', blank=True, null=True)
    object_icon_1 = models.ImageField(upload_to='about/', blank=True, null=True)
    object_icon_2 = models.ImageField(upload_to='about/', blank=True, null=True)

    class Meta:
        verbose_name = "About Settings"
        verbose_name_plural = "About Settings"

    def __str__(self):
        return "About Settings"

    def save(self, *args, **kwargs):
        if not self.pk and AboutSettings.objects.exists():
            self.pk = AboutSettings.objects.first().pk
        super().save(*args, **kwargs)


class Service(models.Model):
    number = models.CharField(max_length=10, help_text="e.g. 01, 02")
    name = models.CharField(max_length=200)
    description = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'number']

    def __str__(self):
        return f"{self.number} - {self.name}"


class Project(models.Model):
    number = models.CharField(max_length=10, help_text="e.g. 01, 02")
    category = models.CharField(max_length=100, help_text="e.g. Client, Personal")
    name = models.CharField(max_length=200)
    live_link = models.URLField(max_length=500, blank=True, null=True)
    video_url = models.URLField(max_length=500, blank=True, null=True, help_text="Optional YouTube/Vimeo/Direct video URL")
    video_file = models.FileField(upload_to='projects/videos/', blank=True, null=True, help_text="Alternatively, upload a video file")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'number']

    def __str__(self):
        return f"{self.number} - {self.name}"


class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/images/')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"Image for {self.project.name} (order: {self.order})"


class Skill(models.Model):
    name = models.CharField(max_length=100)
    level = models.IntegerField(default=80, help_text="Skill level percentage (0 to 100)")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} ({self.level}%)"


class MarqueeItem(models.Model):
    image_url = models.URLField(max_length=500, blank=True, null=True, help_text="Optional online image/GIF URL")
    image_file = models.ImageField(upload_to='marquee/', blank=True, null=True, help_text="Alternatively, upload a file")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"Marquee Item {self.id} (order: {self.order})"


class SocialLink(models.Model):
    platform = models.CharField(max_length=100, help_text="e.g. GitHub, LinkedIn, Behance")
    url = models.URLField(max_length=500)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'platform']

    def __str__(self):
        return f"{self.platform}: {self.url}"


