from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import HeroSettings, AboutSettings, Service, Project, Skill, MarqueeItem, SocialLink

@require_GET
def portfolio_data(request):
    # Retrieve Hero Settings (create default if doesn't exist)
    hero = HeroSettings.objects.first()
    if not hero:
        hero_data = {
            "name": "Abdelrhaman",
            "role_description": "a 3d creator driven by crafting striking and unforgettable projects",
            "portrait": None
        }
    else:
        hero_data = {
            "name": hero.name,
            "role_description": hero.role_description,
            "portrait": request.build_absolute_uri(hero.portrait.url) if hero.portrait else None
        }

    # Retrieve About Settings (create default if doesn't exist)
    about = AboutSettings.objects.first()
    if not about:
        about_data = {
            "main_text": "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!",
            "moon_icon": None,
            "lego_icon": None,
            "object_icon_1": None,
            "object_icon_2": None
        }
    else:
        about_data = {
            "main_text": about.main_text,
            "moon_icon": request.build_absolute_uri(about.moon_icon.url) if about.moon_icon else None,
            "lego_icon": request.build_absolute_uri(about.lego_icon.url) if about.lego_icon else None,
            "object_icon_1": request.build_absolute_uri(about.object_icon_1.url) if about.object_icon_1 else None,
            "object_icon_2": request.build_absolute_uri(about.object_icon_2.url) if about.object_icon_2 else None
        }

    # Retrieve Services
    services_qs = Service.objects.all()
    services_list = []
    for s in services_qs:
        services_list.append({
            "number": s.number,
            "name": s.name,
            "description": s.description
        })

    # Retrieve Skills
    skills_qs = Skill.objects.all()
    skills_list = []
    for sk in skills_qs:
        skills_list.append({
            "name": sk.name,
            "level": sk.level
        })

    # Retrieve Marquee items
    marquee_qs = MarqueeItem.objects.all()
    marquee_list = []
    for mq in marquee_qs:
        url = mq.image_url
        if mq.image_file:
            url = request.build_absolute_uri(mq.image_file.url)
        if url:
            marquee_list.append(url)

    # Retrieve Social links
    social_qs = SocialLink.objects.all()
    social_list = []
    for sl in social_qs:
        social_list.append({
            "platform": sl.platform,
            "url": sl.url
        })

    # Retrieve Projects
    projects_qs = Project.objects.all()
    projects_list = []
    for p in projects_qs:
        # Get related images
        images_list = [request.build_absolute_uri(img.image.url) for img in p.images.all()]
        
        projects_list.append({
            "number": p.number,
            "category": p.category,
            "name": p.name,
            "live_link": p.live_link,
            "video_url": p.video_url,
            "video_file": request.build_absolute_uri(p.video_file.url) if p.video_file else None,
            "images": images_list
        })

    return JsonResponse({
        "hero": hero_data,
        "about": about_data,
        "services": services_list,
        "skills": skills_list,
        "marquee": marquee_list,
        "socials": social_list,
        "projects": projects_list
    })

