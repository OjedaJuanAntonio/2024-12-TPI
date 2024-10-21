# Generated by Django 4.2.16 on 2024-10-20 15:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gestionEscultores', '0006_remove_escultor_dni_adm_escultor_telefono_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='escultor',
            name='ID_Esc',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='escultor',
            name='apellido',
            field=models.CharField(default='pedro', max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='escultor',
            name='nombre',
            field=models.CharField(default='gonzalo', max_length=30),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='escultor',
            name='DNI_Esc',
            field=models.BigIntegerField(),
        ),
    ]
